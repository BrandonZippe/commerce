import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FC, useState } from 'react'
import s from './ProductView.module.css'

import { Swatch, ProductSlider } from '@components/product'
import { Button, Container, Text, useUI, Featured, Hero } from '@components/ui'

import type { Product } from '@commerce/types'
import usePrice from '@framework/product/use-price'
import { useAddItem } from '@framework/cart'

import { getVariant, SelectedOptions } from '../helpers'
import WishlistButton from '@components/wishlist/WishlistButton'
import ProductCard from '../ProductCard/ProductCard'
import { productData } from '../../../content/product'

interface Props {
  className?: string
  children?: any
  product: Product
}

const ProductView: FC<Props> = ({ product }) => {
  const addItem = useAddItem()
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [choices, setChoices] = useState<SelectedOptions>({
    size: null,
    color: null,
  })

  // Select the correct variant based on choices
  const variant = getVariant(product, choices)

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  // define custom fields array
  const customFieldset = product.customFields.edges
  //define content
  let key = product.name
  const content = productData.find((e) => e.product_name === key.toLowerCase())
  console.log(product)

  return (
    <Container className="max-w-none w-full" clean>
      <NextSeo
        title={product.name}
        description={product.description.replace(/<[^>]+>/g, '')}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description.replace(/<[^>]+>/g, ''),
          images: [
            {
              url: product.images[0]?.url!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />

      <Featured
        headline={product.name}
        description={product.description.replace(/<[^>]+>/g, '')}
        image={product.images[0]?.url!}
      />
      <Hero
        headline={product.name}
        description={product.description.replace(/<[^>]+>/g, '')}
      />

      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.productDisplay, 'fit')}>
          <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>
              {price}
              {` `}
              {product.price?.currencyCode}
            </div>
          </div>

          <div className={s.sliderContainer}>
            <ProductSlider key={product.id}>
              {product.images.map((image, i) => (
                <div key={image.url} className={s.imageContainer}>
                  <Image
                    className={s.img}
                    src={image.url!}
                    alt={image.alt || 'Product Image'}
                    width={500}
                    height={500}
                    priority={i === 0}
                    quality="85"
                  />
                </div>
              ))}
            </ProductSlider>
          </div>
        </div>
        <div className={s.sidebar}>
          <section className="text-base">
            {product.options?.map((opt) => (
              <div className="pb-4" key={opt.displayName}>
                <h2 className="uppercase font-medium">{opt.displayName}</h2>
                <div className="flex flex-row py-4">
                  {opt.values.map((v, i: number) => {
                    const active = (choices as any)[
                      opt.displayName.toLowerCase()
                    ]

                    return (
                      <Swatch
                        key={`${opt.id}-${i}`}
                        active={v.label.toLowerCase() === active}
                        variant={opt.displayName}
                        color={v.hexColors ? v.hexColors[0] : ''}
                        label={v.label}
                        onClick={() => {
                          setChoices((choices) => {
                            return {
                              ...choices,
                              [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                            }
                          })
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="pb-14 break-words w-full max-w-xl">
              <Text html={content?.step_into} />
            </div>
            <div className="pb-14 break-words w-full max-w-xl">
              <h3 className="text-2xl uppercase leading-10 font-extrabold text-secondary w-full">
                Technical Specifications
              </h3>
              {customFieldset?.map((fieldset: Array<string>, i: number) => (
                <div
                  className="flex flex-row justify-between content-center py-1"
                  key={customFieldset[i].node.entityId}
                >
                  <span className="font-bold">
                    {customFieldset[i].node.name}
                  </span>
                  <span>{customFieldset[i].node.value}</span>
                </div>
              ))}
            </div>
          </section>
          <div className="pb-4">
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.button}
              onClick={addToCart}
              loading={loading}
              disabled={!variant && product.options.length > 0}
            >
              Add to Cart
            </Button>
          </div>
        </div>
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <WishlistButton
            className={s.wishlistButton}
            productId={product.id}
            variant={product.variants[0]! as any}
          />
        )}
      </div>
    </Container>
  )
}

export default ProductView
