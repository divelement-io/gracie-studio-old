import React from 'react'
import TextSection from 'src/components/TextSection'
import WideMedia from 'src/components/WideMedia'
import FiftyFifty from 'src/components/FiftyFifty'
import Columns from 'src/components/Columns'
import TwoColumnText from 'src/components/TwoColumnText'
import Slideshow from 'src/components/Slideshow'
import WallpaperGrid from 'src/components/WallpaperGrid'
import CollectionList from 'src/components/CollectionList'

import ShowroomList from 'src/components/ShowroomList'
import PersonList from 'src/components/PersonList'
import RepresentativeList from 'src/components/RepresentativeList'

// plopImportModules

const componentMap = {
  textSection: TextSection,
  wideMedia: WideMedia,
  fiftyFifty: FiftyFifty,
  columns: Columns,
  twoColumnText: TwoColumnText,
  slideshow: Slideshow,
  collectionList: CollectionList,
  personList: PersonList,
  showroomList : ShowroomList,
  representativeList: RepresentativeList,
  wallpaperGrid: WallpaperGrid
}

const ComponentRenderer = ({ item, prevTheme, nextTheme, index, isLastSection, isFirstSection }) => {
  if (!item || !item?._type) {
    return false
  }
  const Component = componentMap[item._type]
  if (!Component) {
    // return false
    return (<div><h3>TODO: {item?._type}</h3></div>)
  }

  // console.log(item._type)
  // console.table(item)

  return Component ? (
    <Component
      {...item}
      prevTheme={prevTheme}
      nextTheme={nextTheme}
      isLastSection={isLastSection}
      isFirstSection={isFirstSection}
      index={index}
    />
  ) : null
}

export default ComponentRenderer
