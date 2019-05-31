import React, { useState, useEffect } from 'react'
import { API, Storage } from 'aws-amplify'
import { Container, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import styled from '@xstyled/styled-components'
import Slider from 'react-slick'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css' // This only needs to be imported once in your app
import LoadingPlaceholder from '../components/LoadingPlaceholder'
import Image from '../components/Image'

// #TODO: get file ref link on click, finish jsx, style, cleanup, create EditUpload page

// eslint-disable-next-line react/prop-types
const Item = ({ match }) => {
  const [item, setItem] = useState(placeholder)
  const [featuredImg, setFeaturedImg] = useState(null)
  // For lightbox
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  // const [images, setImages] = useState([null, null, null, null])
  const [images, setImages] = useState([null, null, null, null])

  useEffect(() => {
    async function getItem() {
      try {
        // Get item data
        const itemData = await API.get('file', `/file/${match.params.id}`)
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
            </Container>
          </SubHeader>
        </Header>
        <Container fluid>
          <section>
            <Slider slidesToShow={images.length > 4 ? 4 : images.length} slidesToScroll={2} lazyLoad variableWidth>
              {images.map((image, index) => (
                <SliderImgWrapper
                  onClick={() => {
                    setPhotoIndex(index)
                    setIsOpen(true)
                  }}>
                  <Image src={image} />
                </SliderImgWrapper>
              ))}
            </Slider>

            {isOpen && (
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
              />
            )}
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

const SliderImgWrapper = styled.a`
  margin: 0 16px 2px 0;
  overflow: hidden;
  width: 368px !important; /* Overrides the slick slider applied styles */
  height: 207px;
  cursor: pointer;
`

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
