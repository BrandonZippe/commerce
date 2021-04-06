import React, { FC } from 'react'
import { Container } from '@components/ui'
import { RightArrow } from '@components/icons'
import s from './Hero.module.css'
import Link from 'next/link'
import { productData } from '../../../content/product'
interface Props {
  className?: string
  headline: string
  description: string
}

const Hero: FC<Props> = ({ headline, description }) => {
  //define content
  let key = headline
  const content = productData.find((e) => e.product_name === key.toLowerCase())
  return (
    <div className="bg-secondary">
      <Container>
        <div className={s.root}>
          <h2 className="text-3xl uppercase leading-10 font-extrabold text-primary sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            Step In to the {headline}
          </h2>
          <div className="flex flex-col justify-between">
            <p className="mt-5 text-xl leading-7 text-primary">
              {content?.step_into}
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
    </div>
  )
}

export default Hero
