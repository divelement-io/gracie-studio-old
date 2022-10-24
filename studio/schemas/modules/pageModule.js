export default {
  title: 'Page Content',
  name: 'pageModule',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'content.main.title',
        slugify: (input) =>
          '/' + input
            .toLowerCase()
            //Remove spaces
            .replace(/\s+/g, "-")
            //Remove special characters
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ""),
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'modules',
      title: 'Modules',
      type: 'moduleContent',
    }
  ]
}
