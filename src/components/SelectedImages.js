
import React from 'react'
import styled from 'styled-components'

function SelectedImages({ images }) {

  return (
    <Container>
      {images.map(file => 
        <ImageWrapper>
          {/* {file.name} */}
          <ImageOverlay></ImageOverlay>
          <img src={URL.createObjectURL(file)} style={{maxWidth:'100%'}} />
        </ImageWrapper>
        )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ImageWrapper = styled.div`
  width: 33%;
`

const ImageOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 50%);
`

export default SelectedImages
