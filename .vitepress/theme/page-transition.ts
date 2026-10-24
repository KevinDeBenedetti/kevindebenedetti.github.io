import type { Router } from 'vitepress'
import { nextTick } from 'vue'

/**
 * Cross-fades the page content on client-side navigation with the View
 * Transitions API (https://developer.chrome.com/docs/web-platform/view-transitions/).
 *
 * Progressive: without the API, or with `prefers-reduced-motion: reduce`, the
 * router behaves exactly as before — an instant swap.
 *
 * Performance: the browser takes one snapshot pair and animates it on the
 * compositor; nothing is laid out or painted per frame. Only `.VPContent` is
 * named (via the ROUTING_CLASS on <html>, see custom.css), so the nav and the
 * sidebar never move and the snapshot stays small.
 */

/** Added to <html> for the duration of a route transition. */
export const ROUTING_CLASS = 'vp-routing'

/**
 * Upper bound on how long the old snapshot may stay on screen while the new
 * page chunk loads. VitePress prefetches links in the viewport, so the swap is
 * usually immediate; this only guards slow or cold fetches.
 */
export const SWAP_TIMEOUT_MS = 600

export function viewTransitionsEnabled(): boolean {
  return (
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

export function installPageTransition(router: Router): void {
  const { onBeforeRouteChange, onAfterRouteChange } = router
  const root = document.documentElement

  // Resolves the pending transition's update callback, i.e. "the DOM swapped".
  let releaseSwap: (() => void) | undefined
  // Transitions in flight: a navigation started mid-transition skips the
  // previous one, whose cleanup must not strip the class the new one relies on.
  let active = 0

  router.onBeforeRouteChange = async (to) => {
    if ((await onBeforeRouteChange?.(to)) === false) return false
    if (!viewTransitionsEnabled()) return

    releaseSwap?.()
    active += 1
    root.classList.add(ROUTING_CLASS)

    const swapped = new Promise<void>((resolve) => {
      const timer = setTimeout(resolve, SWAP_TIMEOUT_MS)
      releaseSwap = () => {
        clearTimeout(timer)
        releaseSwap = undefined
        resolve()
      }
    })

    document
      .startViewTransition(() => swapped)
      .finished.catch(() => {})
      .finally(() => {
        active -= 1
        if (active === 0) root.classList.remove(ROUTING_CLASS)
      })
  }

  router.onAfterRouteChange = async (to) => {
    await onAfterRouteChange?.(to)
    // The new page component is rendered on the next tick.
    await nextTick()
    releaseSwap?.()
  }
}
