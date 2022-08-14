import * as mq from 'src/styles/mediaQueries'

export const linearInterpolation = (maxInput, minInput, maxWidth, minWidth) => {
  const slope = (maxInput - minInput) / (maxWidth - minWidth)
  let yInterceptor = minInput - slope * minWidth
  let yInterceptorPosition = true
  if (yInterceptor < 0) {
    yInterceptor = yInterceptor * -1
    yInterceptorPosition = false
  }
  return `calc(${ slope * 100 }vw ${ !yInterceptorPosition ? '-' : '+' } ${ yInterceptor.toFixed(2) }px)`
}

export const responsiveStyles = (styleType, large, medium, small, tiny) => `
  ${ mq.largerAndUp } {
    ${ styleType }: ${ linearInterpolation(medium, large, mq.largerBreakpoint + 1, mq.extraExtraLargeBreakpoint) };
  }
  ${ mq.largerAndBelow } {
    ${ styleType }: ${ linearInterpolation(small, medium, mq.mediumBreakpoint + 1, mq.largerBreakpoint) };
  }
  ${ mq.mediumAndBelow } {
    ${ styleType }: ${ linearInterpolation(tiny, small, mq.tinyBreakpoint, mq.mediumBreakpoint) };
  }
`

export const fontSmoothing = `
	-webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
`
