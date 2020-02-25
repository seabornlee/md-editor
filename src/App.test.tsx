import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import App from './App'

test('it should keep editor content when toggle back from read mode', () => {
  const { getByTestId } = render(<App />)
  const editor = getByTestId('editor')
  editor.innerHTML = 'Hello'

  fireEvent.click(screen.getByText('阅读模式'))
  fireEvent.click(screen.getByText('编辑模式'))

  expect(editor).toHaveTextContent('Hello')
})

test('it should listen onMouseUp event and upload image', () => {
  const { getByTestId } = render(<App />)
  const editor = getByTestId('editor')
  fireEvent.mouseUp(editor)
})
