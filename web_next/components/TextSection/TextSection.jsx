import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Section from 'components/Section'
import TextLockup from 'components/TextLockup'
import Grid, { Container } from 'components/Grid'

const Wrapper = styled(Section)`
  ${ ({ alignment }) => alignment !== 'right' && `
    text-align: ${ alignment };
  ` }
  h1, h2, h3, h4, h5, h6, p, blockquote, ol, ul, dl {
    ${ ({ alignment }) => alignment === 'center' && `
      margin-left: auto;
      margin-right: auto;
    ` }
  }
  h1, h2, h3 {
    max-width: 20em;
  }
  h4, h5 {
    max-width: 26em;
  }
  h6 {
    max-width: 16em;
  }
  p {
    max-width: 36em;
  }
  ol,
  ul,
  dl,
  blockquote {
    max-width: 32em;
  }
`

const TextSection = ({
  className,
  nextTheme,
  prevTheme,
  theme,
  text,
  actions,
  alignment = 'center',
  isFirstSection,
  id
}) => {
  if (!text.text && !text.eyebrow && !actions) {
    return false
  }

  const align = {
    // same as in WideMedia.jsx
    left: {
      medium: '[1]',
      large: '[1]',
      larger: '[1]'
    },
    center: {
      medium: '[1]',
      large: '[1]',
      larger: '[1]'
    },
    right: {
      medium: '6 [6]',
      large: '6 [6]',
      larger: '7 [5]'
    }
  }

  if (!alignment || alignment === null) {
    alignment = 'left'
  }

  return (
    <Wrapper
      className={className}
      prevTheme={prevTheme}
      setTheme={theme}
      nextTheme={nextTheme}
      alignment={alignment}
      isFirstSection={isFirstSection}
      id={id}
    >
      <Container>
        <Grid
          small="[1]"
          medium={align[alignment].medium}
          large={align[alignment].large}
          larger={align[alignment].larger}
          colGap='var(--site-gutters)'
        >
          <TextLockup
            eyebrow={text.eyebrow}
            text={text.text}
            // textSize={paragraphSize}
            actions={actions}
            theme={theme}
            alignment={alignment}
          />
        </Grid>
      </Container>
    </Wrapper>
  )
}

TextSection.propTypes = {
  /** One of the themes specified in `styles/themes.js` */
  theme: PropTypes.string,
  paragraphSize: PropTypes.oneOf(['body', 'bodyMedium', 'bodyLarge', 'bodySmall']),
  /** Text above the headline */
  eyebrow: PropTypes.string,
  /** `raw` rich text from Contentful */
  text: PropTypes.shape({ raw: PropTypes.string }),
  /** Buttons or links to go under text */
  actions: PropTypes.shape([
    {
      __typename: PropTypes.oneOf(['ContentfulButton', 'ContentfulLink']),
      to: PropTypes.string,
      linkToPage: PropTypes.shape({ slug: PropTypes.string }),
      openInNewTab: PropTypes.bool,
      label: PropTypes.string
    }
  ]),
  alignment: PropTypes.oneOf(['center', 'left', 'right']),
  /** Should we adjust the space to accomidate the header? */
  isFirstSection: PropTypes.bool,
}

export default TextSection
