import React, { FC } from 'react'
import { Container, Button } from '@components/ui'
import { RightArrow } from '@components/icons'
import s from './Featured.module.css'
import Link from 'next/link'

interface Props {
  className?: string
  headline: string
  description: string
  image: string
}

const Featured: FC<Props> = ({ headline, description, image }) => {
  return (
    <Container className="featured-hero">
      <div className={s.root}>
        <h2 className="fancy text-4xl text-center leading-10 font-extrabold text-secondary sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
          {headline}
        </h2>

        <img className="center-max-500" src={image} alt="*" />
        <div className="flex flex-col justify-between">
          <p className="mt-5 text-xl text-center leading-7 text-accent-2 text-white center-max-500">
            {description}
          </p>
          {/* <Link href="/blog">
              <a className="text-white pt-3 font-bold hover:underline flex flex-row cursor-pointer w-max-content">
                Read it here
                <RightArrow width="20" heigh="20" className="ml-1" />
              </a>
            </Link> */}
        </div>
      </div>
    </Container>
  )
}

export default Featured
