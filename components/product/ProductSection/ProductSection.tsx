import React, { FC } from 'react'
import IndicatorLine from '../../icons/IndicatorLine'
import { Controller, Scene } from 'react-scrollmagic'

interface Props {
  className?: string
  headline?: string
  copy?: string
}

const ProductSection: FC<Props> = ({ headline, copy, className }) => {
  return (
    <Scene duration={600} pin>
      <article
        className={className + ' flex justify-start relative p-4 xl:my-20'}
      >
        <div className="content-wrap">
          <h3 className="fancy text-3xl text-secondary">{headline}</h3>
          <p className="text-primary">{copy}</p>
        </div>
        <IndicatorLine />
      </article>
    </Scene>
  )
}

export default ProductSection
