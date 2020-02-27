import React from 'react'
import { Radio } from 'antd'
import { MODE_MAP } from '../constants/mode'

export default function ModeSelector({
  onModeChange,
  mode
}: {
  onModeChange: (mode: string, modeName: string) => void;
  mode: string;
}) {
  const onChange = (e: any) => {
    const mode = e.target.value
    onModeChange(mode, MODE_MAP.get(mode) || '')
  }

  return (
    <Radio.Group data-testid="modeSelector" value={mode} onChange={onChange}>
      {Array.from(MODE_MAP.keys()).map(key => {
        return (
          <Radio.Button key={key} value={key} data-testid={key}>
            {MODE_MAP.get(key)}模式
          </Radio.Button>
        )
      })}
    </Radio.Group>
  )
}
