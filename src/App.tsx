import React from 'react'
import './App.css'
import { Input, Radio } from 'antd'
import compile from './utils/markdown-compiler'
import filterImages from './utils/image-filter'

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

  editorRef: any = React.createRef();

  componentDidMount() {
    const editor: any = this.editorRef.current
    editor.addEventListener('drop', this.handleDrop)
  }

  componentWillUnmount() {
    const editor: any = this.editorRef.current
    editor.removeEventListener('drop', this.handleDrop)
  }

  insertImages = (imageURLs: Array<string>) => {
    const text = imageURLs.map(imageURL => `![](${imageURL})`).join('\r\n')
    document.execCommand('insertText', false, text)
  };

  toArray = (fileList: FileList) => {
    const files: Array<File> = []
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i])
    }

    return files
  };

  handleDrop = (e: any) => {
    e.preventDefault()
    console.log(e.dataTransfer)

    const fileList: FileList = e.dataTransfer.files
    const files: Array<File> = this.toArray(fileList)
    const images: Array<File> = filterImages(files)
    const names: Array<string> = images.map(i => i.name)
    this.insertImages(names)

    e.dataTransfer.clearData()
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

  renderMarkdown = () => {
    const { content } = this.state
    const html = compile(content)
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
  };

  onMouseUp = (e: any) => {
    console.log(e)
    console.log(e.which)
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
        <div className="title">
          <Input id="title" placeholder="请输入标题" />
        </div>
        <div className="container">
          <div
            id="editor"
            className={editorVisible ? '' : 'hidden'}
            data-testid="editor"
            contentEditable="true"
            onInput={this.onContentChange}
            ref={this.editorRef}
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
