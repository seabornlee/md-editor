import userEvent from '@testing-library/user-event'
import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('it keeps editor content when toggle back from read mode', async () => {
  const { getByTestId } = render(<App />)
  const editor = getByTestId('editor')

  await userEvent.type(editor, 'Hello')
  userEvent.click(getByTestId('read'))
  userEvent.click(getByTestId('edit'))

  expect(editor).toHaveTextContent('Hello')
})
