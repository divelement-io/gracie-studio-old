import { lighten, darken, rgba, tint } from 'polished'

export const black = '#000'
export const white = '#fff'

// Site Specific Colors
export const yellow = '#FFD780'
export const red = '#EF4F4F'
export const green = '#77B305'
export const blue = '#00aeef'
export const navy = '#021946'
export const orange = '#e68f23'

// Basic Colors
export const transparent = 'transparent'
export const currentcolor = 'currentcolor'
export const bgColor = white
export const mainColor = blue
export const alert = red
export const notify = yellow
export const success = green
export const textColor = navy
export const lightTextColor = tint(0.3, textColor)
export const lightGrey = '#f7f8f9'
export const hrColor = rgba(textColor, 0.15)

// Color Variations
export const mainColorDarken = darken(0.07, mainColor)
export const mainColorLighten = lighten(0.07, mainColor)
