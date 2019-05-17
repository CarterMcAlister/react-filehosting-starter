import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

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

// TODO: add color variables
const DropZone = styled.div`
  border: 2.5px dashed gray;
  cursor: pointer;
  padding: 15px;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  &:hover {
    border: 2.5px dashed gray;
  }
`

export default FileSelector
