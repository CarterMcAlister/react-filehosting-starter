import React, { useState } from 'react'
import styled from '@xstyled/styled-components'
import LoadingPlaceholder from '../components/LoadingPlaceholder'

const Image = ({ src, width = '300px', height = '160px', ...otherProps }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <>
      {!imageLoaded && <LoadingPlaceholder width={width} height={height} />}
      <StyledImage
        src={src}
        width={width}
        height={height}
        {...otherProps}
        onLoad={() => setImageLoaded(true)}
        visible={imageLoaded}
      />
    </>
  )
}

const StyledImage = styled.img`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`

export default Image
