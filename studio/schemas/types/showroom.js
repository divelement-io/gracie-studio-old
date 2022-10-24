
export default {
  name: 'showroom',
  title: 'Showroom',
  type: 'document',
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: "content",
      type: "showroomModule",
    }
  ],
  preview: {
    select: {
      title: 'content.title',
      subtitle: 'content.address.street',
      media: 'content.image'
    }
  }
}
