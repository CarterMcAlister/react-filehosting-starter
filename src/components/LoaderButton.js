import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
// Todo: add FA glyphicons for spinner - styled.div
const LoaderButton = ({ isLoading, text, loadingText, className = '', disabled = false, ...props }) => (
  <Button className={`LoaderButton ${className}`} disabled={disabled || isLoading} {...props}>
    {isLoading && <SpinningGlyphicon glyph="refresh" />}
    {!isLoading ? text : loadingText}
  </Button>
)

const SpinningGlyphicon = styled.div`
  margin-right: 7px;
  top: 2px;
  animation: spin 1s infinite linear;

  @keyframes spin {
    from {
      transform: scale(1) rotate(0deg);
    }
    to {
      transform: scale(1) rotate(360deg);
    }
  }
`

export default LoaderButton
