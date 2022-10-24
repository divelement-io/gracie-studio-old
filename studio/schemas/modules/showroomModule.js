export default {
  title: 'Showroom Content',
  name: 'showroomModule',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'address',
      title: 'Address',
      type: 'address',
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      description: "Enter the 10 digit numeric phone number",
      type: 'string',
    },
    {
      name: 'salesContacts',
      title: 'Sales Contacts',
      type: 'array',
      of: [{type: 'salesContact'}]
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'string',
      validation: Rule =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel']
        })
    },
  ]
}
