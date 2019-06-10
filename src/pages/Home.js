import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, ListGroup, ListGroupItem } from 'react-bootstrap'
import styled from 'styled-components'
import UploadsList from '../components/UploadsList'

function Home({ isAuthenticated }) {
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    async function getList() {
      try {
        const list = await API.get('get-most-recent', `/recent`)
        // list.shift()
        console.log(list)
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
        <h1>Recent Uploads</h1>
        {!isLoading && <UploadsList list={list} />}
      </div>
    )
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

  return <Homepage>{isAuthenticated ? renderlist() : renderLander()}</Homepage>
}

const Homepage = styled.div`
  padding-top: 10vh;
  text-align: center;
`

export default Home
