import { tokens, Icon, IconPath, utils, Button } from '@frebliklo/ls-ds'
import React, { useState } from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

const { COLOR, TYPOGRAPHY, SPACER } = tokens
const { toRem } = utils

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  onDismiss?: () => void
}

const ModalBody = styled.div`
  background: ${COLOR.white};
  padding: 24px;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 5.7px 5.3px ${rgba(COLOR.primary[900], 0.018)},
    0 20.8px 17.9px ${rgba(COLOR.primary[900], 0.025)},
    0 100px 80px ${rgba(COLOR.primary[900], 0.07)};
  z-index: 1;
  width: 100%;
  max-width: 400px;
  min-width: 320px;

  h2 {
    font-size: ${toRem(TYPOGRAPHY.size.h3)};
    font-weight: ${TYPOGRAPHY.weight.bold};
  }
`

const Row = styled.div<{ justifyEnd?: boolean; mt?: number; mb?: number }>`
  display: flex;
  justify-content: ${props => (props.justifyEnd ? 'flex-end' : 'space-between')};
  align-items: center;
  margin-top: ${props => (props.mt ? props.mt : 0)}px;
  margin-bottom: ${props => (props.mb ? props.mb : 0)}px;

  button + button {
    margin-left: 8px;
  }

  p {
    font-size: ${toRem(TYPOGRAPHY.size.bodySmall)};
  }
`

const CloseButton = styled.button`
  padding: 8px;
  border-radius: 50%;
  background: transparent;

  border: none;
  outline: none;

  cursor: pointer;

  transition: all 175ms ease-in-out;

  &:hover,
  &:focus {
    background: ${rgba(COLOR.primary[900], 0.1)};

    & > svg {
      transform: scale(1.15);
    }
  }

  &:active {
    background: ${rgba(COLOR.primary[900], 0.2)};

    & > svg {
      transform: scale(1.05);
    }
  }
`

const Input = styled.input`
  width: 100%;
  font-size: ${toRem(TYPOGRAPHY.size.body)};
  line-height: ${TYPOGRAPHY.lineHeight.default};
  padding: 8px;
  border-radius: 4px;
  border: 2px solid ${COLOR.secondary[700]};
`

const CreateListModal: React.FC<Props> = ({ value, onChange, onDismiss, onSubmit }) => {
  const [loading, setLoading] = useState(false)

  const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)

    e.preventDefault()

    onSubmit()
  }

  return (
    <ModalBody>
      <Row>
        <h2>Create list</h2>
        <CloseButton onClick={onDismiss}>
          <Icon icon={IconPath.CLOSE} fill={COLOR.secondary[900]} />
        </CloseButton>
      </Row>
      <Row>
        <p>Add a new list to your profile.</p>
      </Row>
      <form onSubmit={_handleSubmit}>
        <Row mt={SPACER[1]}>
          <Input
            value={value}
            onChange={onChange}
            autoFocus
            minLength={1}
            type="text"
            placeholder="Name of your new list..."
          />
        </Row>
        <Row justifyEnd mt={SPACER[2]}>
          <Button type="button" onClick={onDismiss} appearance="dangerOutline" small>
            Cancel
          </Button>
          <Button type="submit" appearance="success" small isLoading={loading}>
            Add list
          </Button>
        </Row>
      </form>
    </ModalBody>
  )
}

export default CreateListModal
