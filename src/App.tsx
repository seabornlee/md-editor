import React from 'react'
import './App.css'
import { Switch, Icon } from 'antd'

interface IProps {}
interface IState {
  content: string;
  previewMode: boolean;
}

export default class App extends React.Component<IProps, IState> {
  state: IState = {
    content: '',
    previewMode: false
  };

  onContentChange = (e: React.SyntheticEvent<any>) => {
    const target = e.target as HTMLDivElement
    this.setState({
      content: target.innerText
    })
  };

  onPreviewModeChange = (checked: boolean) => {
    this.setState({
      previewMode: checked
    })
  };

  render = () => {
    return (
      <div className="App">
        Preview&nbsp;
        <Switch
          className="previewMode"
          onChange={this.onPreviewModeChange}
          data-testid="previewMode"
          checkedChildren={<Icon type="check" />}
          unCheckedChildren={<Icon type="close" />}
        />
        <div className="container">
          <div
            id="content"
            data-testid="content"
            contentEditable="true"
            onInput={this.onContentChange}
          />
          {this.state.previewMode && (
            <div id="preview" data-testid="preview">
              {this.state.content}
            </div>
          )}
        </div>
      </div>
    )
  };
}
