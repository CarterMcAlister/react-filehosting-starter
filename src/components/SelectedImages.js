import React, { useState } from 'react'
import styled from '@xstyled/styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  const convertBytesToMb = bytes => {
    if (Number.isNaN(bytes)) {
      return 0
    }

    let numInMb = bytes / Math.pow(1024, 2)
    numInMb = Math.round(numInMb * 10) / 10
    return numInMb
  }

  // TODO: finish styling
  return (
    <Container>
      {images.map(image => (
        <ImageItem key={image.name + image.lastModified}>
          <ImageWrapper>
            <ImageOverlay onClick={() => displayImgModal(URL.createObjectURL(image), image.name)}>
              <ImageName>{image.name}</ImageName>
              <div style={{ color: 'white' }}>{convertBytesToMb(image.size)} MB</div>
              <RemoveBtn icon="times-circle" onClick={() => removeImage(image)} />
            </ImageOverlay>
            <Image src={URL.createObjectURL(image)} alt={image.name} />
          </ImageWrapper>
        </ImageItem>
      ))}
      <ImageModal show={showImgModal} onHide={hideImgModal} image={imgUrl} alt={alt} />
    </Container>
  )
}

const RemoveBtn = styled(FontAwesomeIcon)`
  border-radius: 50%;
  color: white;
  border: none;
  bottom: 0;
  right: 0;
  margin: 5px;
  z-index: 3;
  position: absolute;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
`
const ImageItem = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 10%;
  padding: 15px;
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
  border-radius: 10%;
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
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 3px 10px 10px 10px;

  &:hover {
    white-space: normal;
    overflow: visible;
  }
`
const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10%;
`

export default SelectedImages
