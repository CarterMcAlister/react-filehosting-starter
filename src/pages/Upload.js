import React, { useState } from 'react'
import { API } from 'aws-amplify'
import LoaderButton from '../components/LoaderButton'
import { s3Upload } from '../libs/awsLib'
import config from '../config'
import FileSelector from '../components/FileSelector'
import SelectedFiles from '../components/SelectedFiles'

import { Form, FormField, TextInput, TextArea } from 'grommet'

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
      const fileReference = await Promise.all(
        files.map(async file => await s3Upload(file))
      )

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
        <FormField label="File Name" name="Name">
          <TextInput
            onChange={event => setName(event.target.value)}
            value={name}
          />
        </FormField>
        <FormField label="File Category" name="Category">
          <TextInput
            onChange={event => setCategory(event.target.value)}
            value={category}
          />
        </FormField>
        <FormField label="File Description" name="Description">
          <TextArea
            onChange={event => setDescription(event.target.value)}
            value={description}
          />
        </FormField>
        <FormField label="File(s)" name="File">
          <SelectedFiles files={files} />
          <FileSelector handleSelection={selectedFiles => setFiles(selectedFiles)} />
        </FormField>
        <LoaderButton
          type="submit"
          isLoading={isLoading}
          text="Upload"
          loadingText="Uploading..."
        />
      </Form>
    </div>
  )
}

export default Upload
