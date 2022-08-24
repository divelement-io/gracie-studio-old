export default {
  title: 'Wallpaper Grid',
  name: 'wallpaperGrid',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'title',
      title: 'Title (Optional)',
      type: 'string'
    },
    {
      name: 'shortDescription',
      title: 'Short Description (Optional)',
      type: 'string'
    },
    {
      name: 'wallpapers',
      title: 'wallpapers',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'wallpaper' } }],
      validation: Rule => Rule.min(1).max(40),
    }
  ]
}