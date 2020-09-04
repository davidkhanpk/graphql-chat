import React, { Fragment } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Users from './Users';
import Messages from './Messages';

import { useAuthDispatch } from '../../context/auth'

export default function Home({ history }) {
  const dispatch = useAuthDispatch()
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
     window.location.href = '/login'
    // history.push('/login')
  }
  return (
    <Fragment>
      <Row className="bg-white justify-content-around mb-1">
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="link">Register</Button>
        </Link>
        <Button variant="link" onClick={logout}>
          Logout
        </Button>
      </Row>
      <Row className="bg-white">
        <Users  />
        <Messages />
      </Row>
    </Fragment>
  )
}