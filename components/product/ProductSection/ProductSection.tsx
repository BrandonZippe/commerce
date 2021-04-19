import React, { FC } from 'react'
import IndicatorLine from '../../icons/IndicatorLine'
import { Scene } from 'react-scrollmagic'
import { Tween, Timeline } from 'react-gsap'

interface Props {
  className?: string
  headline?: string
  copy?: string
  toAnime: object
  fromAnime: object
}

const ProductSection: FC<Props> = ({
  headline,
  copy,
  className,
  toAnime,
  fromAnime,
}) => {
  return (
    <Timeline
      target={
        <article className={className + ' flex absolute p-4 indicatorWrap'}>
          <div className="content-wrap">
            <h3 className="subTitle text-3xl text-black">{headline}</h3>
            <p className="copy text-black">{copy}</p>
          </div>
          <IndicatorLine />
        </article>
      }
    >
      <Tween duration={250} from={fromAnime} to={toAnime} reverse="true" />
      <Tween to={{ opacity: 0 }} />
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
