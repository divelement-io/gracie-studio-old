export default {
   name: 'salesContact',
   title: 'Sales Contact',
   type: 'object',
   preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      subtitle: 'email'
    },
    prepare: ({firstName, lastName, subtitle}) => {
      return {
        title: `${firstName} ${lastName}`,
        subtitle
      };
    }
  },
  fields: [
    {
      name: 'firstName',
      type: 'string',
      title: 'First Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'lastName',
      type: 'string',
      title: 'Last Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      type: 'string',
      title: 'E-Mail',
      validation: (Rule) =>
        Rule.required().regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          {
            name: "email", // Error message is "Does not match email-pattern"
            invert: false, // Boolean to allow any value that does NOT match pattern
          }
      )
    },
  ]
}