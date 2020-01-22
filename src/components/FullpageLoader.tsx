import React from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie'

import animationData from '../assets/animation/loader.json'

const Container = styled.div({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(270deg, rgba(7, 6, 20, 0.8) 0%, rgba(6, 11, 20, 0.8) 100%)',
})

const FullpageLoader = () => {
  return (
    <Container>
      <Lottie
        width={300}
        height={300}
        options={{
          animationData,
          loop: true,
          autoplay: true,
        }}
      />
    </Container>
  )
}

export default FullpageLoader
