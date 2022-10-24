export default {
  title: 'Person List',
  name: 'personList',
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
      name: 'eyebrow',
      title: 'Eyebrow (Optional)',
      type: 'string'
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
      name: 'persons',
      title: 'People',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'person' } }],
      validation: Rule => Rule.min(1).max(100),
    }
  ],
  preview: {
    select: {
      title: 'internalName',
    },
    prepare: ({title}) => {
      return {
        title,
        subtitle: 'Person List'
      }
    }

  }
}