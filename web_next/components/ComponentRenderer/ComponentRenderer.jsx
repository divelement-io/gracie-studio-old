import React from 'react'
import TextSection from 'components/TextSection'
import WideMedia from 'components/WideMedia'
import FiftyFifty from 'components/FiftyFifty'
import Columns from 'components/Columns'
import TwoColumnText from 'components/TwoColumnText'
// plopImportModules

import { slugify } from 'utils/format'

const componentMap = {
  textSection: TextSection,
  wideMedia: WideMedia,
  fiftyFifty: FiftyFifty,
  columns: Columns,
  twoColumnText: TwoColumnText,
  // plopAddModules
}

const ComponentRenderer = ({ item, prevTheme, nextTheme, index, isLastSection, isFirstSection }) => {
  if (!item || !item?._type) {
    return false
  }
  const Component = componentMap[item._type]
  if (!Component) {
    return false
  }
  return Component ? (
      <Component
        {...item}
        prevTheme={prevTheme}
        nextTheme={nextTheme}
        id={slugify(item.internalName)}
        isLastSection={isLastSection}
        isFirstSection={isFirstSection}
        index={index}
      />
    ) : null
}

export default ComponentRenderer
