import { lighten, darken, rgba, tint } from 'polished'

// Utility
export const transparent = 'transparent'
export const currentcolor = 'currentcolor'

// Success / Error / Warning
export const green = '#50B87F'
export const red = '#DF693D'
export const yellow = '#FFD780'

// Site Specific Colors

export const black = '#000'
export const offBlack = '#352d2b'

export const white = '#fff'
export const offWhite = '#f7f5f1'
export const linen = '#f0ebe3'

// Basic Colors

export const bgColor = white
export const mainColor = offBlack
export const textColor = offBlack
export const hrColor = linen

export const alert = red
export const notify = yellow
export const success = green

// Color Variations

export const lightTextColor = rgba(textColor, 0.4)
export const lightGrey = lighten(0.7, textColor)

export const mainColorDarken = darken(0.07, mainColor)
export const mainColorLighten = lighten(0.07, mainColor)
