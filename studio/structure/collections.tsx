import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import Emoji from 'a11y-react-emoji'

import { MdCollections } from 'react-icons/md'
const Icon = () => <MdCollections size={24} />

export const CollectionMenuItem = S.listItem()
  .title('Collections')
  .icon(Icon)
  .child(
    S.documentTypeList('collection')
      .title('Collections')
      .menuItems(S.documentTypeList('collection').getMenuItems())
      .filter('_type == $type')
      .params({ type: 'collection' })
  );
