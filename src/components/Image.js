import React, { useState } from 'react'
import styled from '@xstyled/styled-components'
import LoadingPlaceholder from './LoadingPlaceholder'

const Image = ({ src, ...otherProps }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <>
      {!imageLoaded && <LoadingPlaceholder width="100%" height="100%" {...otherProps} />}
      <StyledImage src={src} {...otherProps} onLoad={() => setImageLoaded(true)} visible={imageLoaded} />
    </>
  )
}

const StyledImage = styled.img`
  display: ${props => (props.visible ? 'initial' : 'none')};
  height: 100%;
`

export default Image
