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
		buttonThemeSecondary: 'textColor'
	},
	lightGrey: {
		color: colors.textColor,
		lightColor: colors.lightTextColor,
		background: colors.lightGrey,
		hoverColor: colors.mainColor,
		buttonTheme: 'default',
		buttonThemeSecondary: 'textColor'
	},
	navy: {
		color: colors.bgColor,
		lightColor: tint(0.8, colors.textColor),
		background: colors.textColor,
		hoverColor: colors.mainColor,
		buttonTheme: 'white',
		buttonThemeSecondary: 'default',
		hrColor: 'rgba(255, 255, 255, .3)'
	}
}

// Button Themes
export const buttonThemes = {
	default: {
		color: colors.bgColor,
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
	currentcolor: {
		color: colors.textColor,
		background: 'currentcolor',
		hoverColor: 'currentcolor',
		hoverBackground: 'currentcolor'
	},
	currentcolorOutlined: {
		color: 'currentcolor',
		background: 'transparent',
		hoverColor: colors.textColor,
		hoverBackground: 'currentcolor',
		borderColor: 'currentcolor'
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
		hoverColor: colors.white,
		hoverBackground: colors.mainColor
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
	textColor: {
		color: colors.bgColor,
		background: colors.textColor,
		hoverColor: colors.bgColor,
		hoverBackground: colors.mainColor
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
