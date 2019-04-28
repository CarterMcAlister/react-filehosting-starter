import React from 'react'
import { Refresh } from 'grommet-icons'
import { Button } from 'grommet'
import styled from 'styled-components'

const LoaderButton = ({ isLoading, text, loadingText, className = '', disabled = false, ...props}) =>
  <Button
    label={isLoading ? loadingText : text}
    icon={isLoading && <SpinningRefreshIcon />}
    className={className}
    fill={true}
    disabled={disabled || isLoading}
    {...props}
  />

const SpinningRefreshIcon = styled(Refresh)`
  animation: spin 1s infinite linear;

  @keyframes spin {
    from { transform: scale(1) rotate(0deg); }
    to { transform: scale(1) rotate(360deg); }
  }

`

export default LoaderButton
