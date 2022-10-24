import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

import { MdPeople } from 'react-icons/md'
const Icon = () => <MdPeople size={24} />

export const PeopleMenuItem = S.listItem()
  .title('People')
  .icon(Icon)
  .child(
    S.documentTypeList('person')
      .title('People')
      .menuItems(S.documentTypeList('person').getMenuItems())
      .params({ type: 'person' })
  );
