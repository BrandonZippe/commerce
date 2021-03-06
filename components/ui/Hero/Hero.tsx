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
    <div className="bg-black relative">
      <Container className="container-slim">
        <div className={s.root}>
          <div className="p-4 w-full md:w-2/4 md:p-20 2xl:p-40">
            <h2 className="subTitle text-primary">{content?.header_intro}</h2>
            <p className="copy text-primary">{content?.product_intro}</p>

            {/* <Link href="/blog">
              <a className="text-white pt-3 font-bold hover:underline flex flex-row cursor-pointer w-max-content">
                Read it here
                <RightArrow width="20" heigh="20" className="ml-1" />
              </a>
            </Link> */}
          </div>
          <div className={headline + ' md:hero-width'}></div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
