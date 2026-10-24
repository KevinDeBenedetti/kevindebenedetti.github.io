import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { Router } from 'vitepress'
import { installPageTransition, ROUTING_CLASS, SWAP_TIMEOUT_MS } from '../../page-transition'

type UpdateCallback = () => Promise<void> | void

function makeRouter(): Router {
  return { route: { path: '/', data: {}, component: null }, go: vi.fn() } as unknown as Router
}

/** Minimal `document.startViewTransition`: runs the callback, settles `finished` after it. */
function stubViewTransitions({ reduceMotion = false } = {}) {
  const start = vi.fn((update: UpdateCallback) => {
    const finished = Promise.resolve().then(update).then(() => undefined)
    return { finished, ready: finished, updateCallbackDone: finished, skipTransition: () => {} }
  })
  Object.defineProperty(document, 'startViewTransition', {
    value: start,
    configurable: true,
    writable: true,
  })
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn(() => ({ matches: reduceMotion })),
    configurable: true,
    writable: true,
  })
  return start
}

const html = () => document.documentElement.classList

describe('installPageTransition', () => {
  beforeEach(() => {
    html().remove(ROUTING_CLASS)
    delete (document as { startViewTransition?: unknown }).startViewTransition
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('leaves navigation untouched when the API is missing', async () => {
    const router = makeRouter()
    installPageTransition(router)

    expect(await router.onBeforeRouteChange!('/a')).toBeUndefined()
    expect(html().contains(ROUTING_CLASS)).toBe(false)
  })

  it('does not start a transition under prefers-reduced-motion', async () => {
    const start = stubViewTransitions({ reduceMotion: true })
    const router = makeRouter()
    installPageTransition(router)

    await router.onBeforeRouteChange!('/a')

    expect(start).not.toHaveBeenCalled()
    expect(html().contains(ROUTING_CLASS)).toBe(false)
  })

  it('snapshots the swap and releases it once the route has changed', async () => {
    const start = stubViewTransitions()
    const router = makeRouter()
    installPageTransition(router)

    await router.onBeforeRouteChange!('/a')
    expect(start).toHaveBeenCalledTimes(1)
    expect(html().contains(ROUTING_CLASS)).toBe(true)

    const swapped = vi.fn()
    const pending = (start.mock.calls[0][0] as () => Promise<void>)().then(swapped)
    await Promise.resolve()
    expect(swapped).not.toHaveBeenCalled() // still waiting for the new page

    await router.onAfterRouteChange!('/a')
    await pending
    expect(swapped).toHaveBeenCalled()
    await vi.waitFor(() => expect(html().contains(ROUTING_CLASS)).toBe(false))
  })

  it('never blocks rendering longer than the swap timeout', async () => {
    vi.useFakeTimers()
    const start = stubViewTransitions()
    const router = makeRouter()
    installPageTransition(router)

    await router.onBeforeRouteChange!('/slow')
    const swapped = vi.fn()
    const pending = (start.mock.calls[0][0] as () => Promise<void>)().then(swapped)

    await vi.advanceTimersByTimeAsync(SWAP_TIMEOUT_MS)
    await pending

    expect(swapped).toHaveBeenCalled()
  })

  it('keeps the hooks a caller had already set', async () => {
    const start = stubViewTransitions()
    const router = makeRouter()
    router.onBeforeRouteChange = vi.fn(() => false)
    const after = vi.fn()
    router.onAfterRouteChange = after
    installPageTransition(router)

    expect(await router.onBeforeRouteChange!('/x')).toBe(false)
    expect(start).not.toHaveBeenCalled()

    await router.onAfterRouteChange!('/x')
    expect(after).toHaveBeenCalledWith('/x')
  })
})
