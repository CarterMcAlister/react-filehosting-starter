import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import styled from '@xstyled/styled-components'
import Image from '../components/Image'


function Profile({ isAuthenticated }) {
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    async function getList() {
      try {
        const list = await API.get('list', '/list')
        setList(list)
      } catch (e) {
        alert(e)
      }
    }

    if (!isAuthenticated) {
      return
    }

    getList()

    setIsLoading(false)
  }, [])

  const renderlist = () => {
    return (
      <div className="list">
        <ListGroup>
          <NavLink key="new" to="uploads/new">
            <ListGroupItem>
              <h4>
                <b>{'\uFF0B'}</b> Upload a file
              </h4>
            </ListGroupItem>
          </NavLink>
        </ListGroup>
        {!isLoading && renderFileList(list)}
      </div>
    )
  }

  const renderFileList = list => {
    return list.map(item => (
      <NavLink key={item.uploadId} to={`/uploads/${item.uploadId}`}>
        <UploadedListItem>
          <span>{item.name}</span>
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </UploadedListItem>
      </NavLink>
    ))
  }

  return (
    <div>
      {/* ? Classname not getting set from styled-components properly - need to fix */}
      <UserInfoCard className="card">
        {/* User Info */}
        <Image src="https://via.placeholder.com/200x200" />
        {/* <Card.Img variant="left" src="https://via.placeholder.com/100" /> */}
        <Card.Body>
          <Card.Title>Username</Card.Title>
          <Card.Subtitle>Email</Card.Subtitle>
          <Card.Text>Join Date</Card.Text>
          <Card.Subtitle>About</Card.Subtitle>
          <Card.Text>About placeholder</Card.Text>
        </Card.Body>
        {/* If user's own profile */}
        <Icon icon="user-edit" />

      </UserInfoCard>
      <section>
        {/* Uploads */}
        <h1>Uploads</h1>
        {renderFileList(list)}
      </section>
    </div>
  )
}

const UploadedListItem = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
`

const UserInfoCard = styled(Card)`
  display: flex;
  flex-direction: row;
  margin: 20px;
`

export default Profile
