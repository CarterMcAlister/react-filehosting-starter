import React, { useState, useEffect } from 'react'
import { API, Storage } from 'aws-amplify'
import { Container, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import styled from '@xstyled/styled-components'
import { Link } from 'react-router-dom'

import LoadingPlaceholder from '../components/LoadingPlaceholder'
import ImageGallery from '../components/ImageGallery'

// TODO: get file ref link on click, finish jsx, style, cleanup, create EditUpload page

// eslint-disable-next-line react/prop-types
const Item = ({ match }) => {
  const [item, setItem] = useState(placeholder)
  const [featuredImg, setFeaturedImg] = useState(null)
  // const [images, setImages] = useState([null, null, null, null])
  const [images, setImages] = useState([null, null, null, null])

  useEffect(() => {
    async function getItem() {
      try {
        // Get item data
        const itemData = await API.get('file', `/item/${match.params.userName}/${match.params.id}`)
        setItem(itemData)
        // Get image URLs
        const imageRefs = await getFiles(itemData.imageReference)
        setFeaturedImg(imageRefs[0].link)
        console.log(imageRefs)
        setImages(imageRefs.map(image => image.link))
      } catch (e) {
        alert(e)
      }
    }
    getItem()
  }, [])

  async function getFiles(fileRefs) {
    if (!fileRefs) return []

    const fileReferences = await Promise.all(
      fileRefs.map(async fileRef => {
        return {
          name: fileRef,
          link: await Storage.vault.get(fileRef)
        }
      })
    )
    return fileReferences
  }

  const downloadItem = async fileRef => {
    const itemLink = await getFiles([fileRef])
    window.location.href = itemLink[0].link
  }

  return (
    <div>
      <div>
        <Header bgImg={featuredImg}>
          <SubHeader>
            <Container fluid>
              <h1>{item.name}</h1>
              <h2>{item.category}</h2>
              Uploaded by:
              <Link to={`/${item.userName}`} className="btn btn-text">
                {item.userName}
              </Link>
            </Container>
          </SubHeader>
        </Header>
        <Container fluid>
          <section>
            <ImageGallery images={images} />
          </section>
          <section>
            <h2>About</h2>
            <p>{item.description}</p>
          </section>
          <section>
            <h2>Files</h2>
            <FileList files={item.fileReference} handleClick={downloadItem} />
          </section>
        </Container>
      </div>
    </div>
  )
}

const FileList = ({ files, handleClick }) =>
  files.map(file => (
    <ListGroup>
      <Button
        variant="link"
        onClick={() => {
          handleClick(file)
        }}>
        <UploadedListItem>{file}</UploadedListItem>
      </Button>
    </ListGroup>
  ))

const placeholder = {
  name: <LoadingPlaceholder width="400px" baseColor="#ddd" />,
  category: <LoadingPlaceholder width="600px" baseColor="#ddd" />,
  description: <LoadingPlaceholder count={3} />,
  fileReference: [
    <LoadingPlaceholder width="400px" />,
    <LoadingPlaceholder width="400px" />,
    <LoadingPlaceholder width="400px" />,
    <LoadingPlaceholder width="400px" />
  ]
}

const Header = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #EEE;
  background-image: url('${props => props.bgImg}');
  background-size: cover;
  width: 100%;
  height: 300px;
  margin-bottom: 15px;
  /* border-radius: 0 0 60px 60px; */
`

const SubHeader = styled.div`
  background: rgba(0, 0, 0, 0.3);
  color: white;
  padding-top: 7px;
`
const UploadedListItem = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
`

export default Item
