import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import React from 'react'

type Props = {
  data: any
  className?: string
}

export default function RichText({ data, className }: Props) {
  if (!data) return null

  return (
    <div className={className}>
      <RichTextConverter data={data} />
    </div>
  )
}
