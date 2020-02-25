import { Radio } from 'antd'
import React from 'react'
import { MODE_MAP } from '../constants/mode'

export default function ModeSelector({
  mode,
  onModeChange
}: {
  mode: string;
  onModeChange: (e: any) => void;
}) {
  return (
    <Radio.Group value={mode} onChange={onModeChange}>
      {Array.from(MODE_MAP.keys()).map(m => (
        <Radio.Button key={m} value={m} data-testid={m}>
          {MODE_MAP.get(m)}模式
        </Radio.Button>
      ))}
    </Radio.Group>
  )
}
