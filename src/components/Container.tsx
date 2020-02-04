import styled from 'styled-components'
import { tokens } from '@frebliklo/ls-ds'

const { SPACER } = tokens

const Container = styled.div<{ justifyCenter?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.justifyCenter ? 'center' : 'flex-start')};
  padding: ${SPACER[2]}px;
  max-width: 1024px;
  margin: 0 auto;
`

export default Container
