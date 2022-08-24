import React from 'react'
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import blockText from './blockText'
import siteSettings from './siteSettings'

// Content Types
import page from './types/page'
import menus from './types/menus'
import post from './types/post'
import wallpaper from './types/wallpaper'
import collection from './types/collection'

import theme from './modules/theme'
import textLockup from './modules/textLockup'
import media from './modules/media'
import inlineImage from './modules/inlineImage'
import actions from './modules/actions'
import link from './modules/link'
import navLink from './modules/navLink'
import button from './modules/button'
import youTubeEmbed from './modules/youTubeEmbed'
import embed from './modules/embed'
import video from './modules/video'
import descriptionList, { listItem } from './modules/descriptionList'

// Modules
import textSection from './modules/textSection'
import twoColumnText from './modules/twoColumnText'
import wideMedia from './modules/wideMedia'
import fiftyFifty from './modules/fiftyFifty'
import columns from './modules/columns'
import column from './modules/column'
import wallpaperGrid from './modules/wallpaperGrid'
import collectionList from './modules/collectionList'

import seo from './modules/seo'
import social from './modules/social'
import socialLink from './modules/socialLink'
import pageItem from './modules/pageItem'
import standardText from './modules/standardText'
import moduleContent from './modules/moduleContent'

import pageModule from './modules/pageModule'
import wallpaperModule from './modules/wallpaperModule'
import collectionModule from './modules/collectionModule'

// GraphQL Tab Modules
import pageContent from './tabs/pageContent'
import wallpaperContent from './tabs/wallpaperContent'
import collectionContent from './tabs/collectionContent'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteSettings,
    page,
    menus,
    post,
    collection,
    wallpaper,
    theme,
    textLockup,
    actions,
    link,
    navLink,
    button,
    youTubeEmbed,
    embed,
    video,
    descriptionList,
    listItem,
    media,
    inlineImage,
    // Modules
    textSection,
    twoColumnText,
    wideMedia,
    fiftyFifty,
    columns,
    column,
    wallpaperGrid,
    collectionList,
    pageModule,
    pageItem,
    social,
    socialLink,
    standardText,
    moduleContent,
    seo,
    blockContent,
    blockText,
    // Product Specific Modules
    wallpaperModule,
    collectionModule,

    // GrapqhQL Tab Things
    pageContent,
    wallpaperContent,
    collectionContent,


    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
})
