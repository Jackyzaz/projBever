import React from 'react'
import { Container } from 'react-bootstrap'
import { Loading } from '../components/Loading'
import { UserAuth } from '../contexts/AuthContext'

const UserProfile = () => {
  const {user} = UserAuth()


  if (!user.uid) {
    return <Loading />
  }

  return (
      <Container className='my-5'>
        <h1>Profile Settings</h1>
      </Container>
    )
}

export default UserProfile