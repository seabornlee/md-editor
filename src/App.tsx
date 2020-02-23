import React from 'react'
import './App.css'
import { Switch, Icon } from 'antd'

interface IProps {}
interface IState {
  content: string;
}

export default class App extends React.Component<IProps, IState> {
  state: IState = {
    content: ''
  };

  onContentChange = (e: React.SyntheticEvent<any>) => {
    const target = e.target as HTMLDivElement
    this.setState({
      content: target.innerText
    })
  };

  render = () => {
    return (
      <div className="App">
        Preview&nbsp;
        <Switch
          className="previewMode"
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
          <div id="preview" data-testid="preview">
            {this.state.content}
          </div>
        </div>
      </div>
    )
  };
}
