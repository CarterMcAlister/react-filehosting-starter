import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { Link } from 'react-router-dom'
import UploadList from '../components/UploadList'
import './Home.css'

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
        {!isLoading && <UploadList list={list} />}
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

  return <div className="Home">{isAuthenticated ? renderlist() : renderLander()}</div>
}

export default Home
