import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
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

ImageModal.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
}

ImageModal.defaultProps = {
  image: '',
  alt: ''
}

export default ImageModal
