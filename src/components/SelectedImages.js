import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'
import ImageModal from './ImageModal'

function SelectedImages({ images, removeImage }) {
  const [showImgModal, setShowImgModal] = useState(false)
  const [imgUrl, setImgUrl] = useState(null)
  const [alt, setAlt] = useState('')

  const displayImgModal = (url, altText) => {
    setImgUrl(url)
    setAlt(altText)
    setShowImgModal(true)
  }
  const hideImgModal = () => {
    setImgUrl(null)
    setAlt('')
    setShowImgModal(false)
  }

  // TODO: make responsive
  return (
    <Container>
      {images.map(image => (
        <ImageItem key={image.name + image.lastModified}>
          <ImageWrapper>
            <ImageOverlay>
              <ImageName>{image.name}</ImageName>
              <OverlayBtnWrapper>
                <Button onClick={() => displayImgModal(URL.createObjectURL(image), image.name)}>View Image</Button>
                <Button variant="danger" onClick={() => removeImage(image)}>
                  Remove
                </Button>
              </OverlayBtnWrapper>
            </ImageOverlay>
            <Image src={URL.createObjectURL(image)} alt={image.name} />
          </ImageWrapper>
        </ImageItem>
      ))}
      <ImageModal show={showImgModal} onHide={hideImgModal} image={imgUrl} alt={alt} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
`
const ImageItem = styled.div`
  width: 33%;
  position: relative;
  padding-bottom: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`
const ImageOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  display: none;
  flex-direction: column;
`
const ImageWrapper = styled.div`
  position: relative;

  &:hover ${ImageOverlay} {
    display: flex;
  }
`
const ImageName = styled.div`
  padding-left: 5px;
  color: #fff;
  font-size: 10px;
`
const OverlayBtnWrapper = styled.div`
  display: flex;
  margin: auto;

  .btn {
    margin: 0px 5px;
  }
`
const Image = styled.img`
  max-width: 100%;
  min-height: 170px;
  min-width: 170px;
`

SelectedImages.propTypes = {
  images: PropTypes.arrayOf(Object).isRequired,
  removeImage: PropTypes.func.isRequired
}

export default SelectedImages
