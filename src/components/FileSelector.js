import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from '@xstyled/styled-components'
import { Form } from 'react-bootstrap'

function FileSelector({ handleSelection, required, requiredText }) {
  const onDrop = useCallback(acceptedFiles => {
    handleSelection(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <Form.Check type="input">
      <DropZone {...getRootProps()}>
        {isDragActive ? <span>Drop the files here</span> : <span>Drag and drop, or click to select files</span>}
      </DropZone>
      <Form.Check.Input type="input" required={required} {...getInputProps()} />
      <Form.Control.Feedback type="invalid">{requiredText}</Form.Control.Feedback>
    </Form.Check>
  )
}

// TODO: add color variables
const DropZone = styled.div`
  border: 2.5px dashed gray;
  cursor: pointer;
  padding: 15px;
  display: flex;
  justify-content: center;
  margin-left: -1.25rem;
  margin-bottom: 5px;
  &:hover {
    border: 2.5px dashed gray;
  }
`

export default FileSelector
