import { lighten, darken, rgba } from 'polished'

export const black = '#000'
export const white = '#fff'

// Site Specific Colors
export const yellow = '#FACC02'
export const red = '#D56B33'
export const green = '#00C771'

// Basic Colors
export const transparent = 'transparent'
export const currentcolor = 'currentcolor'
export const bgColor = white
export const mainColor = black
export const alert = red
export const notify = yellow
export const success = green
export const textColor = black
export const lightTextColor = rgba(textColor, 0.4)
export const lightGrey = '#F0F0EE'
export const hrColor = rgba(textColor, 0.1)

// Color Variations
export const mainColorDarken = darken(0.07, mainColor)
export const mainColorLighten = lighten(0.07, mainColor)
