import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react'
import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { config, formspreeEndpoint, personal, socials } from '../../data/site'
import { isValidEmail } from '../../lib/utils'
import { AnimatedSection } from '../ui/AnimatedSection'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

interface FormValues {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'mailto'

const initialValues: FormValues = { name: '', email: '', subject: '', message: '' }

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!isValidEmail(values.email.trim())) errors.email = 'That email address does not look valid.'
  if (values.message.trim().length < 10) errors.message = 'Please write at least 10 characters.'
  if (values.message.length > 4000) errors.message = 'Message is too long (4000 characters max).'
  return errors
}

function buildMailto(values: FormValues): string {
  const subject = values.subject.trim() || `Portfolio enquiry from ${values.name.trim()}`
  const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
  return `mailto:${config.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

async function readFormspreeError(res: Response): Promise<string> {
  try {
    const data: unknown = await res.json()
    if (typeof data === 'object' && data !== null && 'errors' in data) {
      const errs = (data as { errors?: unknown }).errors
      if (Array.isArray(errs)) {
        const first: unknown = errs[0]
        if (typeof first === 'object' && first !== null && 'message' in first) {
          const msg = (first as { message?: unknown }).message
          if (typeof msg === 'string') return msg
        }
      }
    }
  } catch {
    /* fall through */
  }
  return 'Something went wrong while sending. Please try again or email me directly.'
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string
  label: string
  error?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-[var(--cyan)]">
            {' '}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(config.contactEmail)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = config.contactEmail
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={copy}
        icon={copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      >
        {copied ? 'Copied' : 'Copy email'}
      </Button>
      <span role="status" aria-live="polite" className="sr-only-text">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </>
  )
}

export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')
  const uid = useId()
  const id = (name: keyof FormValues) => `${uid}-${name}`
  const configured = formspreeEndpoint !== null

  const onChange =
    (name: keyof FormValues) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [name]: e.target.value }
      setValues(next)
      if (touched[name]) setErrors(validate(next))
      if (status === 'success' || status === 'error' || status === 'mailto') setStatus('idle')
    }

  const onBlur = (name: keyof FormValues) => () => {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validate(values))
  }

  const fieldError = (name: keyof FormValues) => (touched[name] ? errors[name] : undefined)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    // Honeypot — real users never fill this in.
    const honeypot = (form.elements.namedItem('_gotcha') as HTMLInputElement | null)?.value
    if (honeypot) return

    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, email: true, message: true, subject: true })
    if (Object.keys(found).length > 0) {
      const first = (['name', 'email', 'message'] as const).find((k) => found[k])
      if (first) document.getElementById(id(first))?.focus()
      return
    }

    if (!formspreeEndpoint) {
      // Not configured: hand off to the visitor's mail client. Nothing is sent from this site.
      window.location.href = buildMailto(values)
      setStatus('mailto')
      return
    }

    setStatus('submitting')
    setServerError('')
    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      })
      if (res.ok) {
        setStatus('success')
        setValues(initialValues)
        setTouched({})
        setErrors({})
      } else {
        setServerError(await readFormspreeError(res))
        setStatus('error')
      }
    } catch {
      setServerError('Network error. Please check your connection or email me directly.')
      setStatus('error')
    }
  }

  const submitting = status === 'submitting'

  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-heading"
      className="section-pad relative outline-none"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-glow bottom-0 left-1/2 h-80 w-[40rem] -translate-x-1/2 bg-[var(--glow-violet)]" />
      </div>

      <div className="container-x relative">
        <SectionHeader
          id="contact-heading"
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build something <span className="gradient-text">worth shipping</span>
            </>
          }
          description={
            personal.availability.open
              ? `${personal.availability.label}. Reach out about roles, collaborations or interesting problems.`
              : personal.availability.closedLabel
          }
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Details */}
          <AnimatedSection className="space-y-4">
            <div className="card p-5">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-solid text-[var(--blue)]">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted">Email</p>
                  <a href={`mailto:${config.contactEmail}`} className="font-medium break-all hover:underline">
                    {config.contactEmail}
                  </a>
                  <div className="mt-3">
                    <CopyEmailButton />
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-solid text-[var(--cyan)]">
                  <Phone size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-muted">Phone</p>
                  <a href={personal.phoneHref} className="font-medium hover:underline">
                    {personal.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-solid text-[var(--violet)]">
                  <MapPin size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-muted">Location</p>
                  <p className="font-medium">{personal.location}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {socials
                .filter((s) => s.id === 'github' || s.id === 'linkedin')
                .map((s) => (
                  <Button
                    key={s.id}
                    href={s.href}
                    variant="secondary"
                    size="sm"
                    icon={s.id === 'github' ? <GithubIcon size={16} /> : <LinkedinIcon size={16} />}
                    aria-label={`${s.label} (opens in a new tab)`}
                  >
                    {s.label}
                  </Button>
                ))}
              <Button
                href={personal.resumeUrl}
                download={personal.resumeFileName}
                size="sm"
                icon={<Download size={16} aria-hidden="true" />}
              >
                Resume
              </Button>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.08}>
            <form onSubmit={onSubmit} noValidate className="glass gradient-border rounded-3xl p-6 sm:p-8" aria-label="Contact form">
              {!configured ? (
                <div
                  role="note"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-[color-mix(in_srgb,var(--warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] p-4 text-sm"
                >
                  <AlertTriangle size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-warning" />
                  <p>
                    <strong className="font-semibold">Contact form not configured.</strong> Messages
                    are not sent from this site yet. Submitting opens your email app with the message
                    pre-filled, or write directly to{' '}
                    <a href={`mailto:${config.contactEmail}`} className="underline">
                      {config.contactEmail}
                    </a>
                    .
                  </p>
                </div>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={id('name')} label="Name" required error={fieldError('name')}>
                  <input
                    id={id('name')}
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="field"
                    value={values.name}
                    onChange={onChange('name')}
                    onBlur={onBlur('name')}
                    aria-invalid={fieldError('name') ? true : undefined}
                    aria-describedby={fieldError('name') ? `${id('name')}-error` : undefined}
                    required
                  />
                </Field>
                <Field id={id('email')} label="Email" required error={fieldError('email')}>
                  <input
                    id={id('email')}
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="field"
                    value={values.email}
                    onChange={onChange('email')}
                    onBlur={onBlur('email')}
                    aria-invalid={fieldError('email') ? true : undefined}
                    aria-describedby={fieldError('email') ? `${id('email')}-error` : undefined}
                    required
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field id={id('subject')} label="Subject">
                  <input
                    id={id('subject')}
                    name="subject"
                    type="text"
                    className="field"
                    value={values.subject}
                    onChange={onChange('subject')}
                    onBlur={onBlur('subject')}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field id={id('message')} label="Message" required error={fieldError('message')}>
                  <textarea
                    id={id('message')}
                    name="message"
                    rows={6}
                    className="field resize-y"
                    value={values.message}
                    onChange={onChange('message')}
                    onBlur={onBlur('message')}
                    aria-invalid={fieldError('message') ? true : undefined}
                    aria-describedby={fieldError('message') ? `${id('message')}-error` : undefined}
                    required
                  />
                </Field>
              </div>

              {/* Honeypot */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Leave this field empty
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  icon={configured ? <Send size={18} aria-hidden="true" /> : <Mail size={18} aria-hidden="true" />}
                >
                  {submitting ? 'Sending…' : configured ? 'Send message' : 'Open in email app'}
                </Button>

                <div role="status" aria-live="polite" className="text-sm">
                  {status === 'success' ? (
                    <p className="flex items-center gap-2 text-success">
                      <CheckCircle2 size={18} aria-hidden="true" />
                      Thanks — your message was sent.
                    </p>
                  ) : null}
                  {status === 'mailto' ? (
                    <p className="text-muted">
                      Your email app should have opened. Nothing was sent from this site.
                    </p>
                  ) : null}
                </div>
                {status === 'error' ? (
                  <p role="alert" className="flex items-center gap-2 text-sm text-danger">
                    <AlertTriangle size={18} aria-hidden="true" />
                    {serverError}
                  </p>
                ) : null}
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
