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
import ProductSection from '../ProductSection/ProductSection'

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
      <div className="bg-black wave-bg flex flex-col justify-center content-center pb-10">
        <Featured
          headline={product.name}
          description={product.description.replace(/<[^>]+>/g, '')}
          image={product.images[0]?.url!}
        />
        <Button
          aria-label="Add to Cart"
          type="button"
          className="m-auto mb-8 flex-row justify-around align-center px-2"
          onClick={addToCart}
          loading={loading}
          disabled={!variant && product.options.length > 0}
        >
          <span className="text-sm mr-2">Add to Cart</span>
          <span className="text-sm ml-2">{price}</span>
        </Button>
      </div>
      <Hero
        headline={product.name}
        description={product.description.replace(/<[^>]+>/g, '')}
      />

      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.productDisplay, 'fit')}>
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
              <div className="flex flex-row justify-between flex-wrap w-full mb-5">
                <h1 className="text-secondary text-4xl uppercase font-extrabold">
                  {product.name}
                </h1>
              </div>
              <article>
                <h3 className="font-bold text-sm">Features:</h3>
                <Text
                  html={
                    '<p class="text-sm font-light pb-3">' +
                    content?.product_feature +
                    '</p>'
                  }
                />
                <Text
                  html={
                    '<p class="text-sm font-light">' +
                    content?.product_power +
                    '</p>'
                  }
                />
              </article>
            </div>

            <div className="pb-14 break-words w-full max-w-xl">
              <h4 className="text-xl uppercase leading-10 font-extrabold text-secondary w-full">
                Technical Specifications
              </h4>
              {customFieldset?.map((fieldset: Array<string>, i: number) => (
                <div
                  className="flex flex-row justify-between content-center py-1"
                  key={customFieldset[i].node.entityId}
                >
                  <span className="text-sm font-bold">
                    {customFieldset[i].node.name}
                  </span>
                  <span className="text-sm">
                    {customFieldset[i].node.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
          <div className="pb-4 flex flex-row justify-between max-w-xl">
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
            <div className="text-secondary font-bold inline-block tracking-wide py-3 text-2xl text-right">
              {price}
              {` `}
              {product.price?.currencyCode}
            </div>
          </div>
        </div>
        {/* {process.env.COMMERCE_WISHLIST_ENABLED && (
          <WishlistButton
            className={s.wishlistButton}
            productId={product.id}
            variant={product.variants[0]! as any}
          />
        )} */}
      </div>
      <div className="bg-black relative grid items-start gap-8 grid-cols-1 md:grid-cols-2 overflow-x-hidden">
        <div className="col-span-1 p-20 text-lg">
          <article className="mb-4">
            <h3 className="fancy text-3xl text-secondary">
              {content?.header_check}
            </h3>
            <p className="text-primary">{content?.product_check}</p>
          </article>
          <article className="mb-4">
            <h3 className="fancy text-3xl text-secondary">
              {content?.header_gain}
            </h3>
            <p className="text-primary">{content?.product_gain}</p>
          </article>
          <article className="mb-4">
            <h3 className="fancy text-3xl text-secondary">
              {content?.header_pop}
            </h3>
            <p className="text-primary">{content?.product_pop}</p>
          </article>
          <article className="mb-4">
            <h3 className="fancy text-3xl text-secondary">
              {content?.header_location}
            </h3>
            <p className="text-primary">{content?.product_location}</p>
          </article>
          <article className="mb-4">
            <h3 className="fancy text-3xl text-secondary">
              {content?.header_pro_tip}
            </h3>
            <p className="text-primary">{content?.pro_tip}</p>
          </article>
        </div>
        <div className="col-span-1">
          <div className="w-full">
            <img
              src="https://cdn11.bigcommerce.com/s-ismvg5snnx/product_images/uploaded_images/360-mic.gif?t=1618006150&_ga=2.84930137.1300180764.1618006098-2081447066.1617906337"
              alt="*"
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProductView
