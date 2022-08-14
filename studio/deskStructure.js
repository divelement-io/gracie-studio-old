import React from 'react'
import S from '@sanity/desk-tool/structure-builder'

import { ConfigMenu } from './structure/config'
import { PageMenuItem } from './structure/pages'
// Ecommerce
// import { ProductMenuItem } from './structure/products'
// import { ProductVariantParent } from './structure/variants'
// import { CollectionMenuItem } from './structure/collections'
// import { SubscriptionMenuItem } from './structure/subscriptions'

//
// === Structure ===
//

export default () =>
  S.list()
    .title('Content')
    .items([
      PageMenuItem,
      ConfigMenu,
      // CollectionMenuItem,
      // ProductMenuItem,
      // ProductVariantParent,
      // SubscriptionMenuItem,
    ])