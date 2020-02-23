import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

// test('it should be empty by default', () => {
//   const { getByTestId } = render(<App />)
//   expect(getByTestId('content')).toBeEmpty()
// })

test('it should be editable', () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('content')).toHaveAttribute('contenteditable')
})

// describe('Preview mode', () => {
//   test('it should be in edit mode by default', () => {
//     const { getByTestId } = render(<App />)
//     expect(getByTestId('previewMode')).toHaveAttribute('aria-checked', 'false')
//   })
// })
