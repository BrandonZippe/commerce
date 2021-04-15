import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@framework/common/get-all-pages'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container, Button, Input } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy']

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages, legalPages } = usePages(pages)
  const rootClassName = cn(className)

  return (
    <footer className={rootClassName + ' bg-secondary-2'}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-primary py-12 text-primary-2 transition-colors duration-150">
          {/* <div className="col-span-1 lg:col-span-2">
            <Link href="/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className="rounded-full border border-gray-700 mr-2">
                  <Logo />
                </span>
              </a>
            </Link>
          </div> */}
          <div className="col-span-1 md:col-span-6 md:col-start-2">
            <ul className="flex flex-row flex-wrap">
              {/* <li className="py-3 md:py-0 md:pb-4">
                <Link href="/">
                  <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                    Home
                  </a>
                </Link>
              </li>
              <li className="py-3 md:py-0 md:pb-4">
                <Link href="/">
                  <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                    Careers
                  </a>
                </Link>
              </li> */}
              <li className="py-2 md:py-0 w-full sm:w-1/3 md:pb-4">
                <Link href="/blog">
                  <a className="copy text-lg text-secondary hover:text-accents-6 transition ease-in-out duration-150">
                    Media
                  </a>
                </Link>
              </li>
              {sitePages.map((page) => (
                <li
                  key={page.url}
                  className="py-2 md:py-0 md:pb-4 w-full sm:w-1/3"
                >
                  <Link href={page.url!}>
                    <a className="copy text-lg text-secondary hover:text-accents-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 md:col-span-3 md:col-start-9">
            <div className="flex flex-col justify-center">
              <div className="flex flex-row justify-start">
                {/* <span className="bg-primary rounded-full h-10 w-10 mr-2">
                  <Logo />
                </span> */}
                <h4 className="text-primary-2 subTitle text-xl mb-2">
                  Email Signup
                </h4>
              </div>
              <div className="signUp">
                <Input
                  className="mb-2 bg-primary-2 text-base"
                  placeholder="Full Name"
                />
                <Input
                  className="mb-2 bg-primary-2 text-base"
                  type="email"
                  placeholder="Email"
                />
                <Button type="submit" className="py-4 px-10">
                  Submit
                </Button>
              </div>
            </div>
          </div>
          {/* <div className="col-span-1 lg:col-span-6 flex items-start lg:justify-end text-primary">
            <div className="flex space-x-6 items-center h-10">
              <a
                aria-label="Github Repository"
                href="https://github.com/vercel/commerce"
                className={s.link}
              >
                <Github />
              </a>
              <I18nWidget />
            </div>
          </div> */}
        </div>
        <div className="py-4 flex flex-col md:flex-row justify-start md:justify-between items-center copy text-lg text-secondary">
          <ul className="flex flex-col md:flex-row justify-start md:space-x-6 md:ml-4">
            {legalPages.map((page) => (
              <li key={page.url} className="py-3 md:py-0">
                <Link href={page.url!}>
                  <a className="text-secondary copy hover:text-accents-6 transition ease-in-out duration-150 text-lg">
                    {page.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <span className="md:mr-4">
              &copy; 2021 512 Audio, Inc. All rights reserved.
            </span>
          </div>

          {/* <div className="flex items-center text-primary">
            <span className="text-primary">Crafted by</span>
            <a
              rel="noopener"
              href="https://vercel.com"
              aria-label="Vercel.com Link"
              target="_blank"
              className="text-primary"
            >
              <Vercel
                className="inline-block h-6 ml-4 text-primary"
                alt="Vercel.com Logo"
              />
            </a>
          </div> */}
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []
  const legalPages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)

      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return

      if (isLegalPage(slug, locale)) {
        legalPages.push(page)
      } else {
        sitePages.push(page)
      }
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
    legalPages: legalPages.sort(bySortOrder),
  }
}

const isLegalPage = (slug: string, locale?: string) =>
  locale
    ? LEGAL_PAGES.some((p) => `${locale}/${p}` === slug)
    : LEGAL_PAGES.includes(slug)

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
