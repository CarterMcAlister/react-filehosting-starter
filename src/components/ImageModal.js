import React from 'react'
import styled from '@xstyled/styled-components'
import { Modal } from 'react-bootstrap'

const ImageModal = ({ image, alt, show, onHide }) => (
  <StyledModal show={show} onHide={onHide} centered>
    <Image src={image} alt={alt} />
  </StyledModal>
)

const StyledModal = styled(Modal)`
  .modal-dialog {
    display: flex;
    justify-content: center;
    max-width: none;
  }

  .modal-content {
    width: auto;
  }
`
const Image = styled.img`
  max-width: 100%;
  height: auto;
`

export default ImageModal
