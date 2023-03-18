import React from 'react'
import { Button } from 'react-bootstrap'

const StatusTags = (props) => {

  // if (props.status === 'wait') {
  //   return (
  //     <Button variant='warning'>wait</Button>
  //   )
  // } else (props.status === 're') {
  //   re
  // }

  switch (props.status) {
    case 'wait':
      return <Button onClick={props.click} variant='primary'>Waiting for Response</Button>
      break
    case 'inprogress':
      return <Button onClick={props.click} variant='warning'>In Progress</Button>
      break
    case 'success':
      return <Button onClick={props.click} variant='success'>Success</Button>
      break
    case 'fail':
      return <Button onClick={props.click} variant='danger'>Rejected</Button>
      break
    case 'deleted':
      return <Button onClick={props.click} variant='danger'>Deleted</Button>
      break
    default:
      return <Button onClick={props.click} variant='danger'>Error</Button>
  }
}

export default StatusTags