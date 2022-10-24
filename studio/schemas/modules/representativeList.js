export default {
  title: 'Representative List',
  name: 'representativeList',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title (Optional)',
      type: 'string'
    },
    {
      name: "theme",
      title: "Theme",
      type: "theme",
    },
    {
      name: 'representatives',
      title: 'Representatives',
      type: 'array',
      of: [{ type: 'representative' }],
      validation: Rule => Rule.min(1).max(100),
    }
  ],preview: {
    select: {
      title: 'internalName',
    },
    prepare: ({title}) => {
      return {
        title,
        subtitle: 'Representative List'
      }
    }

  }
}