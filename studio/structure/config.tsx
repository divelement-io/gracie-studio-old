import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import Emoji from 'a11y-react-emoji'
import { MdList, MdSettings } from 'react-icons/md'
const ConfigIcon = () => <MdSettings size='24px'/>
const MenusIcon = () => <MdList size='24px'/>
const SettingsIcon = () => <MdSettings size='24px'/>

export const ConfigMenu = S.listItem()
  .title('Settings')
  .icon(ConfigIcon)
  .child(
    S.list()
      .title('Settings')
      .items([
        S.documentListItem('siteSettings')
          .title('Site Settings')
          .icon(SettingsIcon)
          .id('siteSettings')
          .schemaType('siteSettings'),
        S.listItem()
          .title('Menus')
          .icon(MenusIcon)
          .child(
            S.documentTypeList('menus')
              .title('Menus')
              .filter('_type == $type')
              .params({ type: 'menus' })
          )
      ])
  )