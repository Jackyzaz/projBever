import React from 'react'
import { Card } from 'react-bootstrap'
import { db, auth } from '../firebase'

const ProblemCard = () => {
    const userId = auth.currentUser.uid;
  return (
    <Card className='mt-3'>
    <Card.Body>
        <h5></h5>
    </Card.Body>
  </Card>
  )
}


export default ProblemCard