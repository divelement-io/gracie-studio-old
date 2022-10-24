export default {
  title: 'Representative',
  name: 'representative',
  type: 'object',

  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
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
      name: 'faxNumber',
      title: 'Fax Number',
      description: "Enter the 10 digit numeric fax number",
      type: 'string',
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city'
    },
  }
}
