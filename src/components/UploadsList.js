import React from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, ListGroup, ListGroupItem } from 'react-bootstrap'
import styled from '@xstyled/styled-components'

const UploadsList = ({ list }) => {
  return (
    <ListGroup>
      {list.map(item => (
        <NavLink key={item.uploadId} to={`/uploads/${item.uploadId}`}>
          <StyledListGroupItem action>
            <span>{item.name}</span>
            <span>{item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</span>
          </StyledListGroupItem>
        </NavLink>
      ))}
    </ListGroup>
  )
}

const StyledListGroupItem = styled(ListGroup.Item)`
  display: flex;
  justify-content: space-between;
`

UploadsList.propTypes = {
  list: PropTypes.array
}

export default UploadsList
