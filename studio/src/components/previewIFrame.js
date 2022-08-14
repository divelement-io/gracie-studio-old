import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import resolveUrl from '../../resolvePreviewUrl'

const env = process.env.NODE_ENV || 'development'

const PreviewIFrame = () =>
  S.view
    .component(({document}) => {
      const {displayed} = document
      if (!displayed) {
        return <p>Nothing to display</p>
      }
      const url = resolveUrl(displayed)
      return (
        <div style={{
          height: '100%',
          width: '100%',
          background: '#eee',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {
            env !== 'development' && (
              <div style={{
                textAlign: 'center',
                fontSize: '14px',
                maxWidth: '100%',
                flexGrow: 0,
                flexShrink: 0,
                fontWeight: 700,
                padding: '8px 15px',
                background: 'repeating-linear-gradient(  45deg,  #E7C572,  #E7C572 10px,  #DBB043 10px,  #DBB043 20px)'
              }}>
                <p style={{ margin: 0 }}>This is your just a preview. Publish your changes to see them on the live site.</p>
              </div>
            )
          }

          <iframe
            style={{
              width: '100%',
              height: '100%',
              flexGrow: 1
            }}
            frameBorder={'0'}
            src={url}
          />
        </div>
      )
    })
    .title('Web preview')

export default PreviewIFrame
