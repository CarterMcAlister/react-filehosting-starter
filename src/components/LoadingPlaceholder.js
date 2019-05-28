import React from 'react'
import styled, { css, keyframes } from '@xstyled/styled-components'

const LoadingPlaceholder = ({
  baseColor = '#eee',
  highlightColor = '#f5f5f5',
  count = 1,
  duration = 1.2,
  width = '100%',
  height = 'auto',
  circle = false,
  style = {}
}) => {
  console.log(width)
  const PlaceholderItem = styled.span`
    ${placeholderStyles}
    background-color: ${baseColor};
    background-image: linear-gradient(90deg, ${baseColor}, ${highlightColor}, ${baseColor});
    animation: ${placeholderKeyframes} ${duration + 's ease-in-out infinite'};
    width: ${width};
    height: ${height};
    ${circle ? 'border-radius: 50%;' : ''};
  `

  const PlaceholderItems = []
  for (let i = 0; i < count; i++) {
    PlaceholderItems.push(
      <PlaceholderItem key={i} style={style}>
        &zwnj;
      </PlaceholderItem>
    )
  }
  return <>{PlaceholderItems.map(PlaceholderItem => PlaceholderItem)}</>
}

const placeholderKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const placeholderStyles = css`
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  display: inline-block;
  line-height: 1;
`

export default LoadingPlaceholder
