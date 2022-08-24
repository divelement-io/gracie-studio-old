export default {
  name: 'wallpaper',
  title: 'Wallpaper',
  type: 'document',
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],  fields: [
  fields: [
    {
      name: "content",
      type: "wallpaperContent"
    }
  ],
  preview: {
    select: {
      title: 'content.main.title',
      media: 'content.main.mainImage'
    }
  }
}
