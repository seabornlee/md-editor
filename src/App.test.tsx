import userEvent from '@testing-library/user-event'
import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('it should keep editor content when toggle back from read mode', () => {
  const { getByTestId } = render(<App />)
  const editor = getByTestId('editor')
  editor.innerHTML = 'Hello'

  userEvent.click(screen.getByText('阅读模式'))
  userEvent.click(screen.getByText('编辑模式'))

  expect(editor).toHaveTextContent('Hello')
})
