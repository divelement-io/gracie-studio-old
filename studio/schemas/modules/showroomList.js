export default {
  title: 'Showroom List',
  name: 'showroomList',
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
      name: 'showrooms',
      title: 'Showrooms',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'showroom' } }],
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
        subtitle: 'Showroom List'
      }
    }

  }
}