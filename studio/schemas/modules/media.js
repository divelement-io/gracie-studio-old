export default {
  title: 'Media',
  name: 'media',
  type: 'object',
  fields: [
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        list: ['image', 'video'],
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }) => parent.mediaType !== 'image',
      options: {
        hotspot: true,
        accept: ['.jpg', '.jpeg', '.png', '.gif'],
      }
    },
    {
      name: 'altText',
      title: 'Alternative Text',
      description: 'A description of the image. Important for SEO and accessibility',
      type: 'string',
      hidden: ({ parent }) => parent.mediaType !== 'image',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      description: 'Only .mp4 files are supported',
      hidden: ({ parent }) => parent.mediaType !== 'video',
      options: {
        accept: 'video/mp4',
      }
    }
  ]
}
