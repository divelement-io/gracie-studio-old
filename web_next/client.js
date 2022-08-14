import sanityClient from '@sanity/client'
import sanityImage from '@sanity/image-url'
import groq from 'groq'
import modules from 'queries/modules'
import link from 'queries/link'
import { getFileAsset } from '@sanity/asset-utils'

const sanityOptions = {
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
	apiVersion: '2022-06-14'
}

export const client = sanityClient(sanityOptions)

export const getFile = asset => getFileAsset(asset?._ref, sanityOptions)

export const imageBuilder = sanityImage(client)

export const navQuery = groq`
	*[_type == "menus" && slug.current == $slug][0]{
		title,
		items[]{
			_key,
			_type,
			"link": itemLink{
				${link}
			},
			sublinks[]{
				${link}
			}
		}
	}
`

export const pageQuery = groq`
	*[_type == "page" && content.main.slug.current == $slug][0]{
		"title": content.main.title,
		"slug": content.main.slug.current,
		"modules": content.main.modules[]{
			${modules}
		},
		"meta": content.meta
	}
`

export default client
