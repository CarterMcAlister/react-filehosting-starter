import React, { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import styled, { css } from '@xstyled/styled-components'
import { getCognitoIdentityId } from '../libs/awsLib'
import Image from '../components/Image'
import LoadingPlaceholder from '../components/LoadingPlaceholder'
import UploadsList from '../components/UploadsList'

function Profile({ isAuthenticated, match }) {
  const [list, setList] = useState(placeholderList)
  const [profileImage, setProfileImage] = useState(null)
  const [username, setUserName] = useState(<LoadingPlaceholder width="400px" baseColor="#ddd" />)
  const [email, setEmail] = useState(<LoadingPlaceholder width="300px" baseColor="#ddd" />)
  const [joinDate, setJoinDate] = useState(<LoadingPlaceholder width="300px" baseColor="#ddd" />)

  const userName = match.params.userName

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }
    getUserInfo()
    getList()

    async function getUserInfo() {
      try {
        const { joinedOn } = await API.get('get-user', `/user/${userName}`)

        setProfileImage(`https://avatar.tobi.sh/${userName}.svg?text=${userName[0]}`)
        setUserName(userName)
        setJoinDate(new Date(joinedOn))
        // setEmail(userData.userName)
      } catch (e) {
        alert(e)
      }
    }

    async function getList() {
      try {
        const list = await API.get('list', `/list/${userName}`)
        setList(list)
      } catch (e) {
        alert(e)
      }
    }
  }, [])

  const renderFileList = list => {
    return list.map(item => (
      <NavLink key={item.uploadId} to={`/uploads/${item.uploadId}`}>
        <UploadedListItem>
          <span>{item.name}</span>
          <span>{new Date(item.createdAt).toLocaleDateString() && item.createdAt}</span>
        </UploadedListItem>
      </NavLink>
    ))
  }

  return (
    <div>
      {/* ? Classname not getting set from styled-components properly - need to fix */}
      <UserInfoCard className="card">
        {/* User Info */}
        <Image src={profileImage} height="200px" width="200px" baseColor="#ddd" />
        <Card.Body>
          <Card.Title>{username}</Card.Title>
          <Card.Subtitle>{email}</Card.Subtitle>
          {/* <NavLink to="/profile/changepassword">Change Password</NavLink> */}
        </Card.Body>
      </UserInfoCard>
      <section>
        {/* Uploads */}
        <h1>My Uploads</h1>
        <UploadsList list={list} />
      </section>
    </div>
  )
}

const placeholderList = [
  { name: <LoadingPlaceholder width="300px" baseColor="#ddd" /> },
  { name: <LoadingPlaceholder width="300px" baseColor="#ddd" /> },
  { name: <LoadingPlaceholder width="300px" baseColor="#ddd" /> }
]

const UploadedListItem = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
`

const UserInfoCard = styled(Card)`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
`

export default Profile
