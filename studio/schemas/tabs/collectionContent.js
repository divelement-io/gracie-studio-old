import Tabs from 'sanity-plugin-tabs'

export default {
  name: "collectionContent",
  type: "object",
  inputComponent: Tabs,
  fieldsets: [
    { name: "main", title: "Main" },
    { name: "defaultMeta", title: "Meta" }
  ],
  fields: [
    {
      type: "collectionModule",
      name: "main",
      fieldset: "main"
    },
    {
      type: "seo",
      name: "meta",
      fieldset: "defaultMeta"
    }
  ]
}
