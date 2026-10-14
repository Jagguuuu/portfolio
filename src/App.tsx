import { BackToTop } from './components/layout/BackToTop'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { AILab } from './components/sections/AILab'
import { Contact } from './components/sections/Contact'
import { EngineeringShowcase } from './components/sections/EngineeringShowcase'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { InteractiveStudio } from './components/sections/InteractiveStudio'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { ThemeProvider } from './context/ThemeContext'
import { sectionIds } from './data/site'
import { useActiveSection } from './hooks/useActiveSection'

function Page() {
  const active = useActiveSection(sectionIds)

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar active={active} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <EngineeringShowcase />
        <AILab />
        <InteractiveStudio />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  )
}
