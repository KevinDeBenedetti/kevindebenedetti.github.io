// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

import Layout from './Layout.vue'
import HomeAvatar from './components/HomeAvatar.vue'
import HomeSocial from './components/HomeSocial.vue'
import AboutProfile from './components/AboutProfile.vue'
import ProjectCard from './components/ProjectCard.vue'
import ProjectLinks from './components/ProjectLinks.vue'
import ScrollTop from './components/ScrollTop.vue'
import SiteFooter from './components/SiteFooter.vue'
import { installPageTransition } from './page-transition'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    app.component('HomeAvatar', HomeAvatar)
    app.component('HomeSocial', HomeSocial)
    app.component('AboutProfile', AboutProfile)
    app.component('ProjectCard', ProjectCard)
    app.component('ProjectLinks', ProjectLinks)
    app.component('ScrollTop', ScrollTop)
    app.component('SiteFooter', SiteFooter)

    // enhanceApp also runs during the SSR build, where there is no document.
    if (inBrowser) installPageTransition(router)
  }
} satisfies Theme
