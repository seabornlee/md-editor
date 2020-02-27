import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ModeSelector from './ModeSelector'

describe('<ModeSelector />', () => {
  it('emits onModeChange event with selected mode', () => {
    const cb = jest.fn()
    const { getByText } = render(
      <ModeSelector mode="edit" onModeChange={cb} />
    )
    userEvent.click(getByText('预览模式'))
    expect(cb).toBeCalledWith('preview', '预览')
  })

  it('can set mode', () => {
    const cb = jest.fn()
    const { getByTestId } = render(
      <ModeSelector mode="read" onModeChange={cb} />
    )
    expect(getByTestId('read')).toBeChecked()
  })
})
