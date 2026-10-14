import { Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { navItems, personal, socials, type SocialId } from '../../data/site'
import { scrollToSection } from '../../hooks/useActiveSection'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

const socialIcons: Partial<Record<SocialId, ReactNode>> = {
  github: <GithubIcon size={18} />,
  linkedin: <LinkedinIcon size={18} />,
  email: <Mail size={18} aria-hidden="true" />,
}

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-x py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl font-bold">{personal.name}</p>
            <p className="mt-2 text-sm text-muted">{personal.headline}</p>
            <p className="mt-4 text-sm text-subtle">{personal.location}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-4 md:grid-cols-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.id === 'home' ? '#' : `#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.id)
                }}
                className="text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ul className="flex gap-3" aria-label="Social links">
            {socials
              .filter((s) => socialIcons[s.id])
              .map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-[var(--blue)] hover:text-fg"
                  >
                    {socialIcons[s.id]}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {personal.name}. All rights reserved.
          </p>
          <p>Built with React, TypeScript, Tailwind CSS and Framer Motion.</p>
        </div>
      </div>
    </footer>
  )
}
