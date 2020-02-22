import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('it should be empty by default', () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('content')).toBeEmpty()
})

test('it should be editable', () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('content')).toHaveAttribute('contenteditable')
})
