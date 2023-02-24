import React, { FC } from 'react'
import styled, { keyframes } from 'styled-components'

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

const PokeballLoader = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  animation: ${rotate} 1s infinite;
  border-radius: 50%;
`

const PokeballTop = styled.div`
  position: absolute;
  width: 50px;
  height: 20px;
  background-color: #cc0000;
  border-radius: 50%;
  top: 0;
`

const PokeballBottom = styled.div`
  position: absolute;
  width: 50px;
  height: 20px;
  background-color: #cc0000;
  border-radius: 50%;
  bottom: 0;
`

const PokeballCenter = styled.div`
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
`

const Loader: FC = () => (
  <LoaderContainer>
    <PokeballLoader>
      <PokeballTop />
      <PokeballBottom />
      <PokeballCenter />
    </PokeballLoader>
  </LoaderContainer>
)

export default Loader
