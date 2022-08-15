import React from 'react'
import themes from '../../../web/src/styles/themes'
import IconUI from '../../components/IconUI'
import ThemeIcon from "../../components/ThemeIcon"

const themeOptions = Object.entries(themes).map(theme => (
  {
    title: theme[0],
    value: theme[0],
    icon:  <ThemeIcon theme={theme}/>
  }
))

export default {
  title: 'Theme',
  name: 'theme',
  type: 'string',
  initialValue: 'default',
  inputComponent: IconUI,
  // initialValue: themeOptions[0],
  // validation: (Rule) => Rule.required(),
  options: {
    list: themeOptions
  }
}
