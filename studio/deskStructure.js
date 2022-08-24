import React from 'react'
import S from '@sanity/desk-tool/structure-builder'

import { ConfigMenu } from './structure/config'
import { PageMenuItem } from './structure/pages'
import { CollectionMenuItem } from './structure/collections'
import { WallpaperMenuItem } from './structure/wallpapers'

// import { ProductVariantParent } from './structure/variants'
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
      CollectionMenuItem,
      WallpaperMenuItem
    ])