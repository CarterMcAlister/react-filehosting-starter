import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import styled from '@xstyled/styled-components'

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
        <h1>Your Uploads</h1>
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

  const renderLander = () => {
    return (
      <div className="lander">
        <h1>Filehosting Starter</h1>
        <p>A Starter for creating a file hosting site using React and Serverless Node.js</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    )
  }

  return <div className="Profile">{isAuthenticated ? renderlist() : renderLander()}</div>
}

const UploadedListItem = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
`

export default Profile
