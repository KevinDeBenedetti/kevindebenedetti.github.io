import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ScrollTop from '../ScrollTop.vue'

describe('ScrollTop', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  it('does not render the button when scrollY is 0', () => {
    const wrapper = mount(ScrollTop)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('renders the button after scrolling past 100px', async () => {
    const wrapper = mount(ScrollTop)

    Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('hides the button when scrolling back above 100px', async () => {
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
    const wrapper = mount(ScrollTop)
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()

    Object.defineProperty(window, 'scrollY', { value: 50, writable: true })
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('calls window.scrollTo when the button is clicked', async () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
    const wrapper = mount(ScrollTop)
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()

    await wrapper.find('button').trigger('click')

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    scrollToSpy.mockRestore()
  })

  it('removes the scroll event listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const wrapper = mount(ScrollTop)
    wrapper.unmount()
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeSpy.mockRestore()
  })
})
