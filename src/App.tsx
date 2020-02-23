import React from 'react'
import './App.css'
import { Radio } from 'antd'

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

  onContentChange = (e: React.SyntheticEvent<any>) => {
    const target = e.target as HTMLDivElement
    this.setState({
      content: target.innerText
    })
  };

  onModeChange = (e: any) => {
    const mode = e.target.value
    this.setState({
      mode
    })
  };

  render = () => {
    const { mode } = this.state
    const editorVisible = mode === 'edit' || mode === 'preview'
    const previewerVisible = mode === 'preview' || mode === 'read'

    return (
      <div className="App">
        <Radio.Group value={this.state.mode} onChange={this.onModeChange}>
          <Radio.Button value="edit">编辑模式</Radio.Button>
          <Radio.Button value="preview">预览模式</Radio.Button>
          <Radio.Button value="read">阅读模式</Radio.Button>
        </Radio.Group>
        <div className="container">
          <div
            id="editor"
            className={editorVisible ? '' : 'hidden'}
            data-testid="editor"
            contentEditable="true"
            onInput={this.onContentChange}
          />
          <div
            id="previewer"
            className={previewerVisible ? '' : 'hidden'}
            data-testid="previewer"
          >
            {this.state.content}
          </div>
        </div>
      </div>
    )
  };
}
