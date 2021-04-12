import React, { FC } from 'react'
import { productData } from '../../../content/product'
interface Props {
  headline: string
  description: string
}

const ProductSection: FC<Props> = ({ headline, description }) => {
  return (
    <article className="p-10">
      <h3 className="fancy text-3xl text-secondary-2">{headline}</h3>
      <p className="">{description}</p>
    </article>
  )
}

export default ProductSection
