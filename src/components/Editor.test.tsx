import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import Editor from './Editor'

describe('Editor', () => {
  describe('functionality', function() {
    let cb: (content: string) => void
    let editor: HTMLElement

    beforeEach(() => {
      cb = jest.fn()
      const { getByTestId } = render(
        <Editor onContentChange={cb} visible={true} />
      )
      editor = getByTestId('editor')
    })

    it('is editable', () => {
      userEvent.type(editor, 'hello')
      expect(editor).toHaveTextContent('hello')
    })

    it('emit onContentChange event with content', () => {
      userEvent.type(editor, 'hello')
      expect(cb).toBeCalledWith('hello')
    })
  })

  describe('visibility', function() {
    it('can be invisible', () => {
      const cb = jest.fn()
      const { getByTestId } = render(
        <Editor onContentChange={cb} visible={false} />
      )
      const editor = getByTestId('editor')
      expect(editor).not.toBeVisible()
    })
  })
})
