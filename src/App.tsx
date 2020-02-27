import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import './App.css'
import ModeSelector from './components/ModeSelector'
import compile from './utils/markdown-compiler'
import Editor from './components/Editor'
import DropArea from './components/DropArea'

function App() {
  const [content, setContent] = useState<string>('')
  const [mode, setMode] = useState<string>('edit')
  const [modeName, setModeName] = useState<string>('..')

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    document.title = `Markdown Editor - ${modeName}模式`
  }, [mode])

  const onModeChange = (mode: string, modeName: string) => {
    setMode(mode)
    setModeName(modeName)
  }

  const renderMarkdown = () => {
    const html = compile(content)
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
  }

  const editorVisible = mode === 'edit' || mode === 'preview'
  const previewerVisible = mode === 'preview' || mode === 'read'

  return (
    <div className="App">
      <ModeSelector mode={mode} onModeChange={onModeChange} />
      <div className="title">
        <Input id="title" placeholder="请输入标题" />
      </div>
      <div className="container">
        <DropArea>
          <Editor
            visible={editorVisible}
            onContentChange={(content: string) => setContent(content)}
          />
        </DropArea>
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
