import { Input, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import './App.css'
import compile from './utils/markdown-compiler'

const MODE_MAP = new Map<string, string>([
  ['edit', '编辑'],
  ['preview', '预览'],
  ['read', '阅读']
])

function App() {
  const [content, setContent] = useState<string>('')
  const [mode, setMode] = useState<string>('edit')

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    const modeText = MODE_MAP.get(mode)
    document.title = `Markdown Editor - ${modeText}模式`
  }, [mode])

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  // TODO: not use any in TS
  const onModeChange = (e: any) => {
    setMode(e.target.value)
  }

  const renderMarkdown = () => {
    const html = compile(content)
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
  }

  const editorVisible = mode === 'edit' || mode === 'preview'
  const previewerVisible = mode === 'preview' || mode === 'read'

  return (
    <div className="App">
      <Radio.Group value={mode} onChange={onModeChange}>
        {Array.from(MODE_MAP.keys()).map(m => (
          <Radio.Button key={m} value={m} data-testid={m}>
            {MODE_MAP.get(m)}模式
          </Radio.Button>
        ))}
      </Radio.Group>
      <div className="title">
        <Input id="title" placeholder="请输入标题" />
      </div>
      <div className="container">
        <Input.TextArea
          id="editor"
          style={{ display: editorVisible ? '' : 'none' }}
          data-testid="editor"
          placeholder={'请输入文章内容……'}
          value={content}
          onChange={onContentChange}
        />
        <div
          id="previewer"
          style={{ display: previewerVisible ? '' : 'none' }}
          data-testid="previewer"
        >
          {renderMarkdown()}
        </div>
      </div>
    </div>
  )
}

export default App
