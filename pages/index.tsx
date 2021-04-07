import { Layout } from '@components/common'
import { Grid, Marquee, Hero, Featured } from '@components/ui'
import { ProductCard } from '@components/product'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'
import getSiteInfo from '@framework/common/get-site-info'
import getAllPages from '@framework/common/get-all-pages'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const { products } = await getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

export default function Home({
  products,
  brands,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Grid layout="C" variant="filled">
        {products.slice(0, 6).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      {/* <Featured
        headline="u24"
        description="
        Designed by engineers with a deep passion for audio, Limelight is easy to use, built like a tank, and ready to help you bring your voice to the world. Whether you’re Podcasting, Broadcasting, Streaming, Gaming or Recording, the new Limelight dynamic microphone is your key to studio quality sound – no engineering degree needed. So let's get started."
        image="https://cdn11.bigcommerce.com/s-ismvg5snnx/product_images/uploaded_images/u24-front-002.png?t=1617633852&_ga=2.84699225.1746355319.1617630931-248863279.1616771570"
      />
      <Hero
        headline="Limelight: Studio Condenser Microphone"
        description="
        Limelight is a Dynamic Microphone with a Hypercardiod* pickup pattern – that means it will primarily “listen” to what it’s pointed at and will largely ignore sounds off to one side or the other. This is a great feature for Podcasters working in the same room with a co-host where each microphone should ideally only pick up one voice. In this case, we suggest placing the microphone 6 – 8 inches from the speaker, pointed as his or her mouth."
      /> */}

      <Marquee variant="secondary">
        {products.slice(0, 7).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="slim"
            imgProps={{
              width: 240,
              height: 320,
            }}
          />
        ))}
      </Marquee>

      {/* <Grid layout="D">
        {products.slice(0, 3).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {products.slice(0, 3).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="slim"
            imgProps={{
              width: 320,
              height: 320,
            }}
          />
        ))}
      </Marquee> */}
    </>
  )
}

Home.Layout = Layout
