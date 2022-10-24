import React from 'react'
import S from '@sanity/desk-tool/structure-builder'

import { ConfigMenu } from './structure/config'
import { PageMenuItem } from './structure/pages'
import { CollectionMenuItem } from './structure/collections'
import { WallpaperMenuItem } from './structure/wallpapers'

import { ShowroomMenuItem } from './structure/showrooms'
import { PeopleMenuItem } from './structure/people'
import { JournalMenuItem } from './structure/journal'
//
// === Structure ===
//

export default () =>
  S.list()
    .title('Content')
    .items([
      ConfigMenu,
      PageMenuItem,
      CollectionMenuItem,
      WallpaperMenuItem,
      ShowroomMenuItem,
      PeopleMenuItem,
      JournalMenuItem
    ])