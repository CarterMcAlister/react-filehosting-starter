import React, { useState, useEffect } from "react"
import { API, Storage } from "aws-amplify"
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import LoaderButton from "../components/LoaderButton"
import { s3Upload } from "../libs/awsLib"
import config from "../config"
import SelectedFiles from '../components/SelectedFiles'

// #TODO: get file ref link on click, store more file data for retrieval, finish jsx, style, cleanup, create EditUpload page

const Item = (props) => {
  let file = null
  const [isLoading, setIsLoading] = useState(null)
  const [isDeleting, setIsDeleting] = useState(null)
  const [item, setItem] = useState(null)
  const [files, setFiles] = useState([])

  useEffect(() => {
    async function getItem() {
      try {
        let fileReferences
        const item = await API.get("file", `/file/${props.match.params.id}`)
        
        if (item.fileReference) {
          fileReferences = await Promise.all(
            item.fileReference.map(async fileRef => {
              return {
                name: fileRef,
                link: await Storage.vault.get(fileRef)
              }
            })
          )
        }
        setItem(item)
        setFiles(fileReferences)
        console.log(item)
      } catch (e) {
        alert(e)
      }
    }
    getItem()
  }, [])

  const saveitem = item => 
    API.put("file", `/file/${props.match.params.id}`, {
      body: item
    })
  

  const deleteitem = () => API.del("file", `/file/${props.match.params.id}`)

  const formatFilename = str => str.replace(/^\w+-/, "")

  const handleFileChange = event => {
    file = event.target.files[0]
  }

  // const handleSubmit = async event => {
  //   setIsLoading(true)

  //   try {
  //     // Upload attached files
  //     const fileReference = await Promise.all(
  //       files.map(async file => await s3Upload(file))
  //     )

  //     // Add db entry for item
  //     await upload({
  //       fileReference,
  //       name,
  //       category,
  //       description
  //     })
  //     props.history.push('/')
  //   } catch (e) {
  //     alert(e)
  //     setIsLoading(false)
  //   }
  // }

  // const handleDelete = async event => {

  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this item?"
  //   )

  //   if (!confirmed) {
  //     return
  //   }

  //   setIsDeleting(true)

  //   try {
  //     await deleteitem()
  //     props.history.push("/")
  //   } catch (e) {
  //     alert(e)
  //     setIsDeleting(false)
  //   }
  // }

  return (
    <div className="Item">
      {item &&
        <div>
          <div>{item.name}</div>
          <div>Category: {item.category}</div>
          <div>Description: {item.description}</div>

          <h4>Files</h4>
          <SelectedFiles files={files} />
        </div>  
      }
    </div>
  )

}

export default Item
