export default {
  title: 'Collection List',
  name: 'collectionList',
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
      name: "theme",
      title: "Theme",
      type: "theme",
    },
    {
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'collection' } }],
      validation: Rule => Rule.min(1).max(40),
    },
    {
      name: "actions",
      title: "Actions",
      type: "actions",
    }
  ]
}