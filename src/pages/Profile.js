import React, { useState, useEffect } from 'react'
import { API, Storage } from 'aws-amplify'
import styled from '@xstyled/styled-components'
import { Card } from 'react-bootstrap'

import Image from '../components/Image'
import LoadingPlaceholder from '../components/LoadingPlaceholder'
import UploadList from '../components/UploadList'

function Profile({ isAuthenticated, match }) {
  const [list, setList] = useState(placeholderList)
  const [profileImage, setProfileImage] = useState(null)
  const [username, setUserName] = useState(<LoadingPlaceholder width="400px" baseColor="#ddd" />)
  const [joinDate, setJoinDate] = useState(<LoadingPlaceholder width="300px" baseColor="#ddd" />)

  const { userName } = match.params

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

        const listWithImgRefs = await Promise.all(
          list.map(async listItem => {
            return {
              featuredImage: await Storage.vault.get(listItem.featuredImageReference),
              ...listItem
            }
          })
        )
        setList(listWithImgRefs)
      } catch (e) {
        alert(e)
      }
    }
  }, [])

  return (
    <div>
      {/* ? Classname not getting set from styled-components properly - need to fix */}
      <UserInfoCard>
        {/* User Info */}
        <StyledImage src={profileImage} height="200px" width="200px" baseColor="#ddd" />
        <Card.Body>
          <Card.Title>{username}</Card.Title>
          {/* <span>{new Date(joinDate).toLocaleDateString() && joinDate}</span> */}
          {/* <NavLink to="/profile/changepassword">Change Password</NavLink> */}
        </Card.Body>
      </UserInfoCard>
      <section>
        {/* Uploads */}
        <h1>My Uploads</h1>
        <UploadList list={list} />
      </section>
    </div>
  )
}

const placeholderList = [
  { name: <LoadingPlaceholder width="160px" /> },
  { name: <LoadingPlaceholder width="160px" /> },
  { name: <LoadingPlaceholder width="160px" /> },
  { name: <LoadingPlaceholder width="160px" /> },
  { name: <LoadingPlaceholder width="160px" /> }
]

const StyledImage = styled(Image)`
  border-radius: 10%;
`

const UserInfoCard = styled(Card)`
  display: flex;
  flex-direction: row;
  margin: 20px 0;

  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.2);
  border-radius: 25px;
`

export default Profile
