import React from 'react'
import Image from 'components/Image'
import Video from 'components/Video'
import Link from 'components/Link'
import YoutubeVideo from 'components/Video/YoutubeVideo'
import EmbedCode from 'components/EmbedCode'
import { getSlugLink } from 'utils/format'

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET
}

const getClassName = (className, first, last) => {
  let classText = className
  if (first) {
    classText = classText + ' first-item'
  }
  if (last) {
    classText = classText + ' last-item'
  }
  return classText
}

export const Serializer = {
  types: {
    block (props) {
      switch (props.node.style) {
        case 'h1':
          return <h1 className={getClassName('h1', props.node.firstItem, props.node.lastItem)}>{props.children}</h1>

        case 'h2':
          return <h2 className={getClassName('h2', props.node.firstItem, props.node.lastItem)}>{props.children}</h2>

        case 'h3':
          return <h3 className={getClassName('h3', props.node.firstItem, props.node.lastItem)}>{props.children}</h3>

        case 'h4':
          return <h4 className={getClassName('h4', props.node.firstItem, props.node.lastItem)}>{props.children}</h4>

        case 'h5':
          return <h5 className={getClassName('h5', props.node.firstItem, props.node.lastItem)}>{props.children}</h5>

        case 'li':
          return <li>{props.children}</li>

        case 'blockquote':
          return <blockquote className={getClassName('', props.node.firstItem, props.node.lastItem)}>{props.children}</blockquote>

        case 'bodyLarge':
          if (props.listItem) return <strong>{props.children}</strong>
          else return <p className={getClassName('large', props.node.firstItem, props.node.lastItem)}>{props.children}</p>

        case 'bodyMedium':
          if (props.listItem) return <strong>{props.children}</strong>
          else return <p className={getClassName('medium', props.node.firstItem, props.node.lastItem)}>{props.children}</p>

        case 'bodySmall':
          if (props.listItem) return <strong>{props.children}</strong>
          else return <p className={getClassName('small', props.node.firstItem, props.node.lastItem)}>{props.children}</p>

        case 'normal':
          if (props.listItem) return <strong>{props.children}</strong>
          else return <p className={getClassName('', props.node.firstItem, props.node.lastItem)}>{props.children}</p>
        default:
          return <p className={getClassName('', props.node.firstItem, props.node.lastItem)}>{props.children}</p>
      }
    },
    inlineImage: ({ value }) => {
      if (!value?.image?.asset?._ref) {
        return false
      }
      return (
        <div className={getClassName('embeded-content', value.firstItem, value.lastItem)}>
          <Image image={value.image}/>
          {value.caption && <figcaption style={{ paddingTop: '.75em' }}>{value.caption}</figcaption>}
        </div>
      )
      return <div>TODO: Render Image</div>
    },
    video: ({ value }) => {
      if (!value?.video?.asset) {
        return false
      }
      return <div className={getClassName('embeded-content', value.firstItem, value.lastItem)}><Video video={value.video.asset}/></div>
    },
    youTube: ({ value }) => {
      if (!value) { return 'youTube' }
      return <div className={getClassName('embeded-content', value.firstItem, value.lastItem)}><YoutubeVideo src={value.url}/></div>
    },
    descriptionList: ({ value }) => {
      if (!value?.listItems || value?.listItems.length === 0) {
        return false
      }
      return <div className={getClassName('description-list', value.firstItem, value.lastItem)}>
        <dl>
          {value.listItems.map(item => (
            <li key={item._key}>
              <dt>{item.title}</dt>
              <dd>{item.text}</dd>
            </li>
          ))}
        </dl>
      </div>
    },
    embed: ({ value }) => {
      // TODO
      return <p><EmbedCode embedCode={value.embedCode} /></p>
    },
  },
  marks: {
    tick: props => (
      <span className='tick'>{props.children}</span>
    ),
    italic: props => (
      <em>{props.children}</em>
    ),
    strong: props => (
      <strong>{props.children}</strong>
    ),
    code: props => (
      <code>{props.children}</code>
    ),
    link: props => {
      const action = props.value
      return (
        <Link
          to={action.type === 'externalLink' ? action.externalLink : getSlugLink(action.link, false, action.linkSection)}
          external={action.type === 'externalLink'}
          target={action.newTab ? '_blank' : ''}
          title={action.title}
          name={action.title}
        >{props.children}</Link>
      )
    }
  },
  list: props => {
    const { type } = props
    const bullet = type === 'bullet'
    if (bullet) {
      return <ul>{props.children}</ul>
    }
    return <ol>{props.children}</ol>
  },
  listItem: props => <li><p>{props.children}</p></li>
}
