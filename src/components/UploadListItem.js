import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@xstyled/styled-components'
import Image from './Image'

const UploadListItem = ({ item: { uploadId, userName, featuredImage, name } }) => {
  return (
    <GridItem key={uploadId} to={`/${userName}/${uploadId}`}>
      <RoundedImage src={featuredImage} alt="" />
      <ItemInfo>
        <div>{name}</div>
      </ItemInfo>
    </GridItem>
  )
}

const RoundedImage = styled(Image)`
  /* && sets higher specificity - used to override properties on LoadingPlaceholder within Image */
  && {
    height: 200px;
    border-radius: 10%;
  }
`

const GridItem = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 275px;
  height: 250px;
  border: 0.5px solid #eee;
  padding: 6px;
  background: #fff;
  color: #aaa;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.2);
  border-radius: 10%;
  margin: 10px;

  transform: perspective(1px) translateZ(0);
  transition-duration: 0.3s;
  transition-property: transform;

  & :hover {
    transform: scale(1.05);
    text-decoration: none;
    color: #444;
  }
`

const ItemInfo = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
`

export default UploadListItem
