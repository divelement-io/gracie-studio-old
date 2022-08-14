import React from 'react'
import IconUI from '../../components/IconUI'
import { FiAlignCenter, FiAlignLeft } from 'react-icons/fi'
import SectionIcon from '../../components/SectionIcon'

export default {
  title: "Text Section",
  name: "textSection",
  type: "object",
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: "text",
      title: "Text",
      type: "textLockup",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "actions",
      title: "Actions",
      type: "actions",
    },
    {
      name: "alignment",
      title: "Alignment",
      type: "string",
      initialValue: "center",
      inputComponent: IconUI,
      options: {
        list: [
          { title: "Left", value: "left", icon: <FiAlignLeft />},
          { title: "Center", value: "center", icon: <FiAlignCenter />}
        ],
      },
    },
    {
      name: "theme",
      title: "Theme",
      type: "theme",
    },
    {
      name: "hidden",
      title: "Hidden",
      initialValue: false,
      type: "boolean",
    },
  ],
  preview: {
    select: {
      title: 'internalName',
      subtitle: "text.eyebrow",
      alignment: "alignment",
      hidden: "hidden",
      theme: 'theme'
    },
    prepare(selection) {
      const { alignment, subtitle, hidden, theme } = selection;
      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : subtitle || 'Text Section',
        media: alignment === "left" ? <SectionIcon hidden={hidden} theme={theme}><FiAlignLeft size='24px'/></SectionIcon> : <SectionIcon hidden={hidden} theme={theme}><FiAlignCenter size='24px'/></SectionIcon>,
      });
    },
  },
};
