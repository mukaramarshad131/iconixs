'use client'
import React from 'react'
import { sendGAEvent } from '@next/third-parties/google'

const GAButton = () => {
  return (
    <button onClick={() => sendGAEvent({event:'buttonClicked', value:'xyz' })}>Send Event</button>
  )
}

export default GAButton
