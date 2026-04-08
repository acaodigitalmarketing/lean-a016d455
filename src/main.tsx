import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Self-hosted fonts — elimina dependência de Google Fonts (font-display: swap nativo)
import '@fontsource/barlow/300.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'
import '@fontsource/barlow/700.css'
import '@fontsource/barlow-condensed/600.css'
import '@fontsource/barlow-condensed/700.css'
import '@fontsource/barlow-condensed/800.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/playfair-display/900.css'

import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({ duration: 1.2 })
;(window as any).__lenis = lenis

// Sincroniza Lenis com GSAP ScrollTrigger (parallax scrub funciona)
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

createRoot(document.getElementById("root")!).render(<App />);
