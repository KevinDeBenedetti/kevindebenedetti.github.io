// https://vitepress.dev/guide/custom-theme
import { h, Fragment } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

import CustomCursor from './components/CustomCursor.vue'
import Earth from './components/Earth.vue'
import HomeAvatar from './components/HomeAvatar.vue'
import ScrollTop from './components/ScrollTop.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-hero-image': () => h(HomeAvatar),
      'home-features-after': () => h(Earth),
      'layout-bottom': () => h(Fragment, null, [h(SiteFooter), h(ScrollTop), h(CustomCursor)]),
    })
  },
  enhanceApp({ app }) {
    app.component('CustomCursor', CustomCursor)
    app.component('Earth', Earth)
    app.component('HomeAvatar', HomeAvatar)
    app.component('ScrollTop', ScrollTop)
    app.component('SiteFooter', SiteFooter)
  }
} satisfies Theme
