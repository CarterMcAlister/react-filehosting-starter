import React from 'react'
import styled from '@xstyled/styled-components'
import UploadListItem from './UploadListItem'

const UploadList = ({ list }) => {
  return (
    <Grid>
      {list.map(item => (
        <UploadListItem item={item} />
      ))}
    </Grid>
  )
}

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: center; */
  & :after {
    content: '';
    flex: 10 0 auto;
  }
`

export default UploadList
