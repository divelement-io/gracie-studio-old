import { lighten, darken, rgba, tint } from 'polished'

export const black = '#000'
export const white = '#fff'

// Success / Error / Warning
export const green = '#50B87F'
export const red = '#DF693D'
export const yellow = '#FFD780'

// Site Specific Colors
export const offWhite = '#f7f5f1'
export const offBlack = '#352d2b'
export const linen = '#f0ebe3'

// Basic Colors
export const transparent = 'transparent'
export const currentcolor = 'currentcolor'

export const bgColor = white
export const mainColor = offBlack
export const textColor = offBlack

export const alert = red
export const notify = yellow
export const success = green

export const lightTextColor = rgba(textColor, 0.4)
export const lightGrey = lighten(0.71, textColor)
export const hrColor = linen

// Color Variations
export const mainColorDarken = darken(0.07, mainColor)
export const mainColorLighten = lighten(0.07, mainColor)
