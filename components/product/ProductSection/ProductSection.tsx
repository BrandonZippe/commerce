import React, { FC } from 'react'
import IndicatorLine from '../../icons/IndicatorLine'
import { Scene } from 'react-scrollmagic'
import { Tween, Timeline } from 'react-gsap'

interface Props {
  className?: string
  headline?: string
  copy?: string
  time?: number
  from?: object
  to?: object
}

const ProductSection: FC<Props> = ({ headline, copy, className, from, to }) => {
  return (
    <Timeline
      target={
        <article
          className={className + ' flex justify-start relative p-4 xl:my-20'}
        >
          <div className="content-wrap">
            <h3 className="subTitle text-3xl text-black">{headline}</h3>
            <p className="copy text-black">{copy}</p>
          </div>
          <IndicatorLine />
        </article>
      }
    >
      <Tween duration={500} from={{ opacity: 0 }} to={{ opacity: 1 }} />
    </Timeline>

    // <Scene duration={time} pin>
    //   <article
    //     className={className + ' flex justify-start relative p-4 xl:my-20'}
    //   >
    //     <div className="content-wrap">
    //       <h3 className="fancy text-3xl text-secondary">{headline}</h3>
    //       <p className="text-primary">{copy}</p>
    //     </div>
    //     <IndicatorLine />
    //   </article>
    // </Scene>
  )
}

export default ProductSection
