import { tokens } from '@frebliklo/ls-ds'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { rgba, darken } from 'polished'

import Portal from './Portal'

const { COLOR } = tokens

interface Props {
  onEscPress?: () => void
}

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background: ${rgba(darken(0.15, COLOR.secondary[900]), 0.95)};
`

const Modal: React.FC<Props> = ({ children, onEscPress }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleEscPress, false)

    return () => {
      document.removeEventListener('keydown', handleEscPress, false)
    }
  }, [])

  const handleEscPress = (e: KeyboardEvent) => {
    if (e.keyCode === 27 && onEscPress) {
      onEscPress()
    }
  }

  return (
    <Portal>
      <Backdrop />
      {children}
    </Portal>
  )
}

export default Modal
