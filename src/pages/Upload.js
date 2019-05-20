import React, { useState } from 'react'
import { API } from 'aws-amplify'
import { Form } from 'react-bootstrap'

import LoaderButton from '../components/LoaderButton'
import { s3Upload } from '../libs/awsLib'
import FileSelector from '../components/FileSelector'
import SelectedFiles from '../components/SelectedFiles'
import SelectedImages from '../components/SelectedImages'

// eslint-disable-next-line react/prop-types
function Upload({ history }) {
  const [isLoading, setIsLoading] = useState(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])
  const [validated, setValidated] = useState(false)

  const upload = item => {
    return API.post('upload', '/upload', {
      body: item
    })
  }

  const handleSubmit = async event => {
    const form = event.currentTarget
    setValidated(true)

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    setIsLoading(true)

    try {
      // Upload attached files
      const fileReference = await Promise.all(files.map(async file => await s3Upload(file)))

      // Add db entry for item
      await upload({
        fileReference,
        name,
        category,
        description
      })
      history.push('/')
    } catch (e) {
      alert(e)
      setIsLoading(false)
    }
  }

  return (
    <div className="Upload">
      <Form onSubmit={handleSubmit} validated={validated} noValidate>
        <Form.Group controlId="Name">
          <Form.Label>File Name</Form.Label>
          <Form.Control onChange={event => setName(event.target.value)} value={name} type="text" required />
          <Form.Control.Feedback type="invalid">Please provide a valid name.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="Category">
          <Form.Label>File Category</Form.Label>
          <Form.Control onChange={event => setCategory(event.target.value)} value={category} required />
          <Form.Control.Feedback type="invalid">Please provide a valid category.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="Description">
          <Form.Label>File Description</Form.Label>
          <Form.Control onChange={event => setDescription(event.target.value)} value={description} required />
          <Form.Control.Feedback type="invalid">Please provide a valid description.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="Image">
          <Form.Label>Image(s)</Form.Label>
          <SelectedImages
            images={images}
            removeImage={itemToRemove => {
              setImages(prevImages => prevImages.filter(image => image !== itemToRemove))
            }}
          />
          <FileSelector
            handleSelection={selectedImages => {
              setImages(prevImages => [...prevImages, ...selectedImages])
            }}
            requiredText="Please choose at least one image."
            required
          />
          <Form.Control.Feedback type="invalid">Please choose at least one image.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="File">
          <Form.Label>File(s)</Form.Label>
          <SelectedFiles
            files={files}
            removeFile={itemToRemove => {
              setFiles(prevFiles => prevFiles.filter(file => file !== itemToRemove))
            }}
          />
          <FileSelector
            handleSelection={selectedFiles => setFiles(prevFiles => [...prevFiles, ...selectedFiles])}
            requiredText="Please choose at least one file."
            required
          />
          <Form.Control.Feedback type="invalid">Please choose at least one file.</Form.Control.Feedback>
        </Form.Group>
        <LoaderButton type="submit" isLoading={isLoading} text="Upload" loadingText="Uploading..." />
      </Form>
    </div>
  )
}

export default Upload
