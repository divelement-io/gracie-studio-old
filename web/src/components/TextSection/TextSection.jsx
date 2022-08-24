import React from 'react'
import styled from '@emotion/styled'
import Section from 'src/components/Section'
import TextLockup from 'src/components/TextLockup'
import { Container } from 'src/components/Grid'
import { colors } from 'src/styles'

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
  h1 {
    max-width: ${ ({ alignment }) => alignment === 'center' ? '18em' : '16em' };
  }
  h2, h3 {
    max-width: ${ ({ alignment }) => alignment === 'center' ? '28em' : '34em' };
  }
  h4, h5 {
    max-width: ${ ({ alignment }) => alignment === 'center' ? '38em' : '36em' };
  }
  h6 {
    max-width: ${ ({ alignment }) => alignment === 'center' ? '18em' : '16em' };
  }
  p {
    max-width: ${ ({ alignment }) => alignment === 'center' ? '42em' : '46em' };
    strong {
      font-weight: normal;
    }
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
  headline,
  headlineSize,
  headlineElement,
  textSize,
  actions,
  alignment = 'center',
  isFirstSection,
  extraPadding = true,
  entranceDelay,
  showHr,
  id
}) => {
  if (!headline && !text && !text?.eyebrow && !actions) {
    return false
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
      extraPadding={extraPadding}
    >
      <Container>
        <TextLockup
          eyebrow={text?.eyebrow}
          text={text?._rawText || (typeof text === 'string' && text) || (typeof text !== 'object' && text) || (Array.isArray(text) && text)}
          // text={text}
          headline={text?._rawHeadline || headline}
          headlineSize={headlineSize}
          headlineElement={headlineElement}
          textSize={textSize}
          actions={actions}
          theme={theme}
          alignment={alignment}
          entranceDelay={entranceDelay}
          debug
          showHr={showHr}
        />
      </Container>
    </Wrapper>
  )
}

export default TextSection
