import React from 'react'

import Tabs from 'sanity-plugin-tabs'

export default {
  name: "pageContent",
  type: "object",
  title: "Page Content",
  inputComponent: Tabs,
  fieldsets: [
    { name: "main", title: "Content" },
    { name: "meta", title: "SEO" }
  ],
  fields: [
    {
      type: "pageModule",
      name: "main",
      fieldset: "main"
    },
    {
      type: "seo",
      name: "meta",
      fieldset: "meta"
    }
  ]
}
