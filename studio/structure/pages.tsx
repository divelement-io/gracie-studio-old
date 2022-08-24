import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import PreviewIFrame from '../src/components/previewIFrame'
import { MdInsertDriveFile } from 'react-icons/md'
const Icon = () => <MdInsertDriveFile size={24} />

export const PageMenuItem = S.listItem()
  .title('Pages')
  .icon(Icon)
  .child(
    S.documentTypeList('page')
      .title('Pages')
      .menuItems(S.documentTypeList('page').getMenuItems())
      .filter('_type == $type')
      .params({ type: 'page' })
      .child(documentId =>
        S.document()
          .schemaType('page')
          .documentId(documentId)
          .views([
            S.view.form(),
            PreviewIFrame(documentId)
          ])
        )
  );
