import React, { useState } from 'react'
import styled from 'styled-components'
import Lightbox from 'react-image-lightbox'
import Slider from 'react-slick'
import 'react-image-lightbox/style.css'

import Image from './Image'

const ImageGallery = ({ images }) => {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Slider slidesToShow={images.length > 4 ? 4 : images.length} slidesToScroll={2} lazyLoad variableWidth>
        {images.map((image, index) => (
          <SliderImgWrapper
            onClick={() => {
              setPhotoIndex(index)
              setIsOpen(true)
            }}
            key={image}>
            <Image src={image} />
          </SliderImgWrapper>
        ))}
      </Slider>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />
      )}
    </>
  )
}

const SliderImgWrapper = styled.a`
  margin: 0 16px 2px 0;
  overflow: hidden;
  width: 368px !important; /* Overrides the slick slider applied styles */
  height: 207px;
  cursor: pointer;
`

export default ImageGallery
