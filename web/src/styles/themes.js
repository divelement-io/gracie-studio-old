import * as colors from './colors'
import { lighten, darken, tint } from 'polished'

// Themes (ThemeSelector Component)
export const themes = {
	default: {
		color: colors.textColor,
		lightColor: colors.lightTextColor,
		background: colors.bgColor,
		hoverColor: colors.mainColor,
		buttonTheme: 'default',
		buttonThemeSecondary: 'defaultOutlined'
	},
	offWhite: {
		color: colors.textColor,
		lightColor: colors.lightTextColor,
		background: colors.offWhite,
		hoverColor: colors.mainColor,
		buttonTheme: 'default',
		buttonThemeSecondary: 'defaultOutlined'
	},
	lightGrey: {
		color: colors.textColor,
		lightColor: colors.lightTextColor,
		background: colors.lightGrey,
		hoverColor: colors.mainColor,
		buttonTheme: 'default',
		buttonThemeSecondary: 'defaultOutlined'
	},
	darkGrey: {
		color: colors.bgColor,
		lightColor: tint(0.8, colors.textColor),
		background: colors.mainColor,
		hoverColor: colors.offWhite,
		buttonTheme: 'white',
		buttonThemeSecondary: 'default',
		hrColor: 'rgba(255, 255, 255, .3)'
	},
	transparent: {
		color: colors.bgColor,
		lightColor: tint(0.8, colors.textColor),
		background: 'transparent',
		hoverColor: colors.offWhite,
		selectColor: colors.textColor,
		buttonTheme: 'whiteOutlined',
		buttonThemeSecondary: 'whiteOutlined',
		hrColor: 'rgba(255, 255, 255, .3)'
	},
	linen: {
		color: colors.textColor,
		lightColor: colors.lightTextColor,
		background: colors.linen,
		hoverColor: colors.mainColor,
		buttonTheme: 'default',
		buttonThemeSecondary: 'defaultOutlined'
	},
}

// Button Themes
export const buttonThemes = {
	default: {
		color: colors.bgColor,
		background: colors.mainColor,
		hoverColor: colors.bgColor,
		hoverBackground: darken(0.1, colors.mainColor)
	},
	transparent: {
		color: colors.lightTextColor,
		background: 'transparent',
		hoverColor: colors.textColor,
		hoverBackground: 'transparent'
	},
	whiteOutlined: {
		color: colors.bgColor,
		hoverColor: colors.mainColor,
		background: 'transparent',
		hoverBackground: colors.bgColor,
		borderColor: colors.bgColor,
		hoverBorder: colors.bgColor
	},
	defaultOutlined: {
		color: colors.textColor,
		hoverColor: colors.bgColor,
		background: 'transparent',
		hoverBackground: colors.textColor,
		borderColor: colors.textColor,
		hoverBorder: colors.textColor
	},
	black: {
		color: colors.bgColor,
		hoverColor: colors.bgColor,
		background: colors.black,
		hoverBackground: lighten(0.1, colors.black)
	},
	white: {
		color: colors.textColor,
		background: colors.white,
		hoverColor: colors.textColor,
		hoverBackground: darken(0.07, colors.white)
	},
	lightGrey: {
		color: colors.textColor,
		background: colors.lightGrey,
		hoverColor: colors.textColor,
		hoverBackground: lighten(0.07, colors.lightGrey)
	},
	mainColor: {
		color: colors.bgColor,
		background: colors.mainColor,
		hoverColor: colors.bgColor,
		hoverBackground: lighten(0.1, colors.mainColor)
	},
	textColor: {
		color: colors.bgColor,
		background: colors.textColor,
		hoverColor: colors.bgColor,
		hoverBackground: lighten(0.1, colors.textColor)
	}
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
	},
	light: {
		color: 'var(--text-color)',
		placeholderColor: 'var(--light-text-color)',
		background: colors.transparent,
		accentColor: colors.mainColor,
		hoverColor: colors.bgColor,
		borderColor: 'var(--hr-color)',
		hoverBorderColor: 'var(--text-color)',
		focusBorderColor: 'var(--text-color)',
		hoverBackground: colors.transparent,
		focusBackground: colors.transparent,
	}
}

export default themes
