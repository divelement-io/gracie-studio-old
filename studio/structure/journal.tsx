import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

import { MdArticle } from 'react-icons/md'
const Icon = () => <MdArticle size={24} />

export const JournalMenuItem = S.listItem()
  .title('Journal')
  .icon(Icon)
  .child(
    S.documentTypeList('article')
      .title('Journal')
      .menuItems(S.documentTypeList('article').getMenuItems())
      .params({ type: 'article' })
  );
