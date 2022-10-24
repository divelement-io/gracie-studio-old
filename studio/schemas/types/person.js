
export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: "content",
      type: "personModule",
    }
  ],
  preview: {
    select: {
      title: 'content.firstName',
      subtitle: 'content.lastName',
      media: 'content.image'
    }
  }
}
