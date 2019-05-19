import React, { useState } from 'react'
import { API } from 'aws-amplify'
import LoaderButton from '../components/LoaderButton'
import { s3Upload } from '../libs/awsLib'
import FileSelector from '../components/FileSelector'
import SelectedFiles from '../components/SelectedFiles'
import SelectedImages from '../components/SelectedImages'
import { Form } from 'react-bootstrap'

function Upload(props) {
  const [isLoading, setIsLoading] = useState(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])
  const [validated, setValidated] = useState(false)

  const upload = item => {
    console.log(item)
    return API.post('upload', '/upload', {
      body: item
    })
  }

  const handleSubmit = async event => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
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
      props.history.push('/')
    } catch (e) {
      alert(e)
      setIsLoading(false)
    }
  }

  const selection = (item) => {
    console.log(files.concat(item))
    setFiles(files.concat(item))
  }

  return (
    <div className="Upload">
      <Form onSubmit={handleSubmit} validated={validated} noValidate>
        <Form.Group controlId="Name">
          <Form.Label>File Name</Form.Label>
          <Form.Control onChange={event => setName(event.target.value)} value={name} type="text" required />
          <Form.Check type="invalid">Please provide a valid name.</Form.Check>
        </Form.Group>
        <Form.Group controlId="Category">
          <Form.Label>File Category</Form.Label>
          <Form.Control onChange={event => setCategory(event.target.value)} value={category} required />
          <Form.Check type="invalid">Please provide a valid category.</Form.Check>
        </Form.Group>
        <Form.Group controlId="Description">
          <Form.Label>File Description</Form.Label>
          <Form.Control onChange={event => setDescription(event.target.value)} value={description} required />
          <Form.Check type="invalid">Please provide a valid description.</Form.Check>
        </Form.Group>
        <Form.Group controlId="Image">
          <Form.Label>Image(s)</Form.Label>
          <SelectedImages images={images} />
          <FileSelector handleSelection={selectedImages => setImages([...images, ...selectedImages])} />
        </Form.Group>
        <Form.Group controlId="File">
          <Form.Label>File(s)</Form.Label>
          <SelectedFiles files={files} />
          <FileSelector handleSelection={selectedFiles => setFiles(selectedFiles)} />
          <Form.Check type="invalid">Please choose at least one file.</Form.Check>
        </Form.Group>
        <LoaderButton type="submit" isLoading={isLoading} text="Upload" loadingText="Uploading..." />
      </Form>
    </div>
  )
}

export default Upload
