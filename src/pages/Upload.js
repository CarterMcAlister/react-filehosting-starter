import React, { useState } from 'react'
import { API } from 'aws-amplify'
import LoaderButton from '../components/LoaderButton'
import { s3Upload } from '../libs/awsLib'
import FileSelector from '../components/FileSelector'
import SelectedFiles from '../components/SelectedFiles'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

function Upload(props) {
  const [isLoading, setIsLoading] = useState(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState([])

  const upload = item => {
    console.log(item)
    return API.post('upload', '/upload', {
      body: item
    })
  }

  const handleSubmit = async event => {
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

  return (
    <div className="Upload">
      <Form onSubmit={handleSubmit}>
        <FormGroup name="Name">
          <ControlLabel>File Name</ControlLabel>
          <FormControl onChange={event => setName(event.target.value)} value={name} />
        </FormGroup>
        <FormGroup name="Category">
          <ControlLabel>File Category</ControlLabel>
          <FormControl onChange={event => setCategory(event.target.value)} value={category} />
        </FormGroup>
        <FormGroup name="Description">
          <ControlLabel>File Description</ControlLabel>
          <FormControl onChange={event => setDescription(event.target.value)} value={description} />
        </FormGroup>
        <FormGroup name="File">
          <ControlLabel>File(s)</ControlLabel>
          <SelectedFiles files={files} />
          <FileSelector handleSelection={selectedFiles => setFiles(selectedFiles)} />
        </FormGroup>
        <LoaderButton type="submit" isLoading={isLoading} text="Upload" loadingText="Uploading..." />
      </Form>
    </div>
  )
}

export default Upload
