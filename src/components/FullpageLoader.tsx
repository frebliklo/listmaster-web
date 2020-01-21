import React from 'react'
import styled from 'styled-components'

const Container = styled.div({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const FullpageLoader = () => {
  return (
    <Container>
      <h3>Loading</h3>
    </Container>
  )
}

export default FullpageLoader
