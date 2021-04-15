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
  subHeadline?: string
}

const Featured: FC<Props> = ({ headline, description, image, subHeadline }) => {
  return (
    <Container className="featured-hero">
      <div className={s.root}>
        <h1 className="title text-primary-2 text-center leading-8">
          {headline}
        </h1>
        <h2 className="subTitle text-secondary text-center">{subHeadline}</h2>

        <img className="center-max-500" src={image} alt="*" />
        <div className="flex flex-col justify-between">
          <p className="mt-0 copy text-center text-primary leading-relaxed center-max-600">
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
