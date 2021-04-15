import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FC, useState } from 'react'
import s from './ProductView.module.css'
import React, { useRef } from 'react'
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
import { Controller, Scene } from 'react-scrollmagic'
import Sequence from '../Sequence'

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
  const ref = useRef()

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
      <div className="bg-black wave-bg flex flex-col justify-center content-center pb-20">
        <Featured
          headline={product.name}
          description={product.description.replace(/<[^>]+>/g, '')}
          image={product.images[0]?.url!}
          subHeadline="Condenser Microphone"
        />
        <Button
          aria-label="Add to Cart"
          type="button"
          className="m-auto mb-8 flex flex-row justify-between align-center px-0"
          onClick={addToCart}
          loading={loading}
          disabled={!variant && product.options.length > 0}
        >
          <span className="copy p-6 bg-primary-2 text-purple">
            {price}
            {` `}
            {product.price?.currencyCode}
          </span>
          <span className="copy p-6 text-primary">Add to Cart</span>
        </Button>
        {/* <div className="gradient"></div> */}
      </div>
      <Hero headline={product.name} description={product.description} />

      <div className="sequence-wrap relative py-40">
        <h2 className="stickyHeader title text-black text-center">
          {product?.name}
        </h2>
        <Controller>
          <Scene duration="200%" triggerHook="onLeave" pin>
            {(progress?: any) => (
              <div
                style={{
                  height: '100vh',
                  position: 'relative',
                  paddingTop: '10em',
                }}
              >
                <Sequence ref={ref} progress={progress} />
              </div>
            )}
          </Scene>
          <div className="absolute top-0 grid items-start gap-96 xl:gap-80 grid-cols-1 xl:grid-cols-2 overflow-x-hidden py-20">
            <div className="col-span-1 xl:p-20 text-lg indicator-right">
              <ProductSection
                className="flex-row xl:ml-20 bottom"
                headline={content?.header_check}
                copy={content?.product_check}
                time={200}
              />
              <ProductSection
                className="flex-row middle"
                headline={content?.header_gain}
                copy={content?.product_gain}
                time={800}
              />
            </div>

            <div className="col-span-1 xl:p-20 text-lg indicator-left">
              <ProductSection
                className="flex-row-reverse middle"
                headline={content?.header_pop}
                copy={content?.product_pop}
                time={400}
              />
              <ProductSection
                className="flex-row-reverse top"
                headline={content?.header_location}
                copy={content?.product_location}
                time={600}
              />
              <ProductSection
                className="flex-row-reverse xl:mr-40 bottom"
                headline={content?.header_pro_tip}
                copy={content?.pro_tip}
                time={800}
              />
            </div>
          </div>
        </Controller>
      </div>

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
              className="m-auto mb-8 flex flex-row justify-between align-center px-0"
              onClick={addToCart}
              loading={loading}
              disabled={!variant && product.options.length > 0}
            >
              <span className="text-sm p-6">Add to Cart</span>

              <span className="text-sm p-6 bg-primary-2 text-secondary">
                {price}
                {` `}
                {product.price?.currencyCode}
              </span>
            </Button>
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
    </Container>
  )
}

export default ProductView
