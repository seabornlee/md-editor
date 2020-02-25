import { Input, Radio } from 'antd'
import React from 'react'
import './App.css'
import compile from './utils/markdown-compiler'

interface IProps {}
interface IState {
  content: string;
  mode: string;
}

export default class App extends React.Component<IProps, IState> {
  state: IState = {
    content: '',
    mode: 'edit'
  };

  onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      content: e.target.value
    })
  };

  onModeChange = (e: any) => {
    const mode = e.target.value
    this.setState({
      mode
    })
  };

  renderMarkdown = () => {
    const { content } = this.state
    const html = compile(content)
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
  };

  render = () => {
    const { mode, content } = this.state
    const editorVisible = mode === 'edit' || mode === 'preview'
    const previewerVisible = mode === 'preview' || mode === 'read'

    return (
      <div className="App">
        <Radio.Group value={this.state.mode} onChange={this.onModeChange}>
          <Radio.Button value="edit" data-testid="edit">
            编辑模式
          </Radio.Button>
          <Radio.Button value="preview">预览模式</Radio.Button>
          <Radio.Button value="read" data-testid="read">
            阅读模式
          </Radio.Button>
        </Radio.Group>
        <div className="title">
          <Input id="title" placeholder="请输入标题" />
        </div>
        <div className="container">
          <Input.TextArea
            id="editor"
            className={editorVisible ? '' : 'hidden'}
            data-testid="editor"
            placeholder={'请输入文章内容……'}
            value={content}
            onChange={this.onContentChange}
          />
          <div
            id="previewer"
            className={previewerVisible ? '' : 'hidden'}
            data-testid="previewer"
          >
            {this.renderMarkdown()}
          </div>
        </div>
      </div>
    )
  };
}
