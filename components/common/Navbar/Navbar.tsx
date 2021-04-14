import { FC } from 'react'
import Link from 'next/link'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import NavbarRoot from './NavbarRoot'
import s from './Navbar.module.css'

const Navbar: FC = () => (
  <NavbarRoot>
    <Container>
      <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
        <div className="flex items-center">
          <Link href="/">
            <a className={s.logo} aria-label="Logo">
              <Logo />
            </a>
          </Link>
          <nav className="mx-6 space-x-4 lg:block flex-wrap">
            <Link href="/about">
              <a className={s.link}>About</a>
            </Link>
            <Link href="/search/microphones">
              <a className={s.link}>Microphones</a>
            </Link>
            <Link href="/search/headphones">
              <a className={s.link}>Headphones</a>
            </Link>
            <Link href="/blog">
              <a className={s.link}>Media</a>
            </Link>
          </nav>
        </div>

        <div className="flex justify-end space-x-8">
          <div className="hidden lg:flex">
            <Searchbar />
          </div>
          <div className="flex flex-col justify-center align-center">
            <UserNav />
          </div>
        </div>
      </div>

      <div className="flex pb-4 lg:px-6 lg:hidden">
        <Searchbar id="mobile-search" />
      </div>
    </Container>
  </NavbarRoot>
)

export default Navbar
