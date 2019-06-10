import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { Card } from 'react-bootstrap'
import styled from '@xstyled/styled-components'
import Image from '../components/Image'
import LoadingPlaceholder from '../components/LoadingPlaceholder'
import UploadsList from '../components/UploadsList'

function Profile({ isAuthenticated, match }) {
  const [list, setList] = useState(placeholderList)
  const [profileImage, setProfileImage] = useState(null)
  const [username, setUserName] = useState(<LoadingPlaceholder width="400px" baseColor="#ddd" />)
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

  return (
    <div>
      {/* ? Classname not getting set from styled-components properly - need to fix */}
      <UserInfoCard className="card">
        {/* User Info */}
        <Image src={profileImage} height="200px" width="200px" baseColor="#ddd" />
        <Card.Body>
          <Card.Title>{username}</Card.Title>
          {/* <span>{new Date(joinDate).toLocaleDateString() && joinDate}</span> */}
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

const UserInfoCard = styled(Card)`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
`

export default Profile
