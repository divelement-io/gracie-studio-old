import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { MdOutlineImage } from 'react-icons/md'
const Icon = () => <MdOutlineImage size={24} />

export const WallpaperMenuItem = S.listItem()
  .title('Wallpapers')
  .icon(Icon)
  .child(
    S.documentTypeList('wallpaper')
      .title('Wallpapers')
      .menuItems(S.documentTypeList('wallpaper').getMenuItems())
      .params({ type: 'wallpaper' })
  );
