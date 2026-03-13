import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Earth from '../Earth.vue'

describe('Earth', () => {
  it('renders the container element', () => {
    const wrapper = mount(Earth)
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  it('renders the section-banner with the rotating earth', () => {
    const wrapper = mount(Earth)
    expect(wrapper.find('.section-banner').exists()).toBe(true)
  })

  it('renders all 7 star elements', () => {
    const wrapper = mount(Earth)
    for (let i = 1; i <= 7; i++) {
      expect(wrapper.find(`#star-${i}`).exists()).toBe(true)
    }
  })
})
