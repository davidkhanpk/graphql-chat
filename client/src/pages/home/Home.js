import React, { Fragment, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Users from './Users';
import Messages from './Messages';
import {gql, useSubscription } from '@apollo/client'

import { useAuthDispatch, useAuthState } from '../../context/auth'
import { useMessageDispatch } from '../../context/message'

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid content from to createdAt
    }
  }
`
export default function Home({ history }) {
  const authDispatch = useAuthDispatch()
  const messageDispatch = useMessageDispatch()
  const { user } = useAuthState()
  const { data: messageData, error: messageError} = useSubscription(NEW_MESSAGE);

  useEffect(() => {
    if(messageError) console.log(messageError);
    if(messageData) {
      console.log(messageData)
      const message = messageData.newMessage
      const otherUser = user.username === message.to ? message.from : message.to
      messageDispatch({ type: "ADD_MESSAGE", payload: {
        username: otherUser,
        message
      }})
    }
  }, [messageError, messageData])
  const logout = () => {
    authDispatch({ type: 'LOGOUT' })
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