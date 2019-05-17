import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { base } from 'grommet/themes'

function FileSelector({ handleSelection }) {
  const onDrop = useCallback(acceptedFiles => {
    handleSelection(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <DropZone {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <span>Drop the files here</span> : <span>Drag and drop, or click to select files</span>}
    </DropZone>
  )
}

const grommetColors = base.global.colors

const DropZone = styled.div`
  border: 2.5px dashed ${grommetColors['light-5']};
  cursor: pointer;
  padding: 15px;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  &:hover {
    border: 2.5px dashed ${grommetColors.brand};
  }
`

export default FileSelector
