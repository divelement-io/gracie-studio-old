import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

import { MdStore } from 'react-icons/md'
const Icon = () => <MdStore size={24} />

export const ShowroomMenuItem = S.listItem()
  .title('Showrooms')
  .icon(Icon)
  .child(
    S.documentTypeList('showroom')
      .title('Showrooms')
      .menuItems(S.documentTypeList('showroom').getMenuItems())
      .params({ type: 'showroom' })
  );
