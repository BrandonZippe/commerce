const commerce = require('./commerce.config.json')
const withCommerceConfig = require('./framework/commerce/with-config')

const isBC = commerce.provider === 'bigcommerce'
const isShopify = commerce.provider === 'shopify'
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
const withImages = require('next-images')

module.exports = withCommerceConfig({
  commerce,
  i18n: {
    locales: ['en-US', 'es'],
    defaultLocale: 'en-US',
  },
  rewrites() {
    return [
      (isBC || isShopify) && {
        source: '/checkout',
        destination: '/api/bigcommerce/checkout',
      },
      // The logout is also an action so this route is not required, but it's also another way
      // you can allow a logout!
      isBC && {
        source: '/logout',
        destination: '/api/bigcommerce/customers/logout?redirect_to=/',
      },
      // Rewrites for /search
      {
        source: '/search/designers/:name',
        destination: '/search',
      },
      {
        source: '/search/designers/:name/:category',
        destination: '/search',
      },
      {
        // This rewrite will also handle `/search/designers`
        source: '/search/:category',
        destination: '/search',
      },
    ].filter((x) => x)
  },
})

module.exports = withImages({
  assetPrefix: isProd ? 'https://zippecodes.site' : 'http://localhost:3000',
  dynamicAssetPrefix: true,
  webpack(config, options) {
    return config
  },
})

module.exports = {
  images: {
    domains: ['cdn11.bigcommerce.com'],
  },
}
