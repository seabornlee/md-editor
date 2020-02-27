import React from 'react'
import { Input } from 'antd'

export default function Editor({
  onContentChange,
  visible
}: {
  onContentChange: (content: string) => void;
  visible: boolean;
}) {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value)
  }
  return (
    <Input.TextArea
      data-testid="editor"
      onChange={onChange}
      style={{ display: visible ? '' : 'none' }}
    />
  )
}
