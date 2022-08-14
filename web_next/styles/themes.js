import * as colors from './colors'
import { lighten, darken, cssVar } from 'polished'

// Themes (ThemeSelector Component)
export const themes = {
	default: {
		color: colors.textColor,
		background: colors.bgColor,
		buttonTheme: 'default',
		buttonThemeSecondary: 'lightGrey'
	},
	lightGrey: {
		color: colors.textColor,
		background: colors.lightGrey,
		buttonTheme: 'default',
		buttonThemeSecondary: 'white'
	},
	mainColor: {
		color: colors.bgColor,
		background: colors.mainColor,
		mainColor: colors.bgColor,
		buttonTheme: 'white',
		buttonThemeSecondary: 'lightGrey'
	}
}

// Button Themes
export const buttonThemes = {
	default: {
		color: 'var(--bg-color)',
		background: colors.mainColor,
		hoverColor: colors.bgColor,
		hoverBackground: lighten(0.07, colors.mainColor)
	},
	transparent: {
		color: colors.lightTextColor,
		background: 'transparent',
		hoverColor: colors.textColor,
		hoverBackground: 'transparent'
	},
	// textColor theme inherits the themes colors
	textColor: {
		color: colors.bgColor,
		background: colors.textColor,
		hoverColor: lighten(0.07, colors.bgColor),
		hoverBackground: lighten(0.07, colors.textColor)
	},
	black: {
		color: colors.bgColor,
		background: colors.black,
		hoverColor: colors.mainColor,
		hoverBackground: darken(0.07, colors.mainColor)
	},
	white: {
		color: colors.textColor,
		background: colors.white,
		hoverColor: colors.mainColor,
		hoverBackground: colors.lightGrey
	},
	lightGrey: {
		color: colors.textColor,
		background: colors.lightGrey,
		hoverColor: colors.textColor,
		hoverBackground: darken(0.07, colors.lightGrey)
	},
	mainColor: {
		color: colors.bgColor,
		background: colors.mainColor,
		hoverColor: colors.bgColor,
		hoverBackground: lighten(0.07, colors.mainColor)
	},
}

// Input Themes
export const inputThemes = {
	default: {
		color: colors.textColor,
		placeholderColor: colors.lightTextColor,
		background: colors.transparent,
		accentColor: colors.bgColor,
		hoverColor: colors.bgColor,
		borderColor: colors.lightTextColor,
		hoverBorderColor: colors.textColor,
		focusBorderColor: colors.mainColor,
		hoverBackground: colors.transparent,
		focusBackground: colors.transparent,
	}
}

export default themes
