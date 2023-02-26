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
      return <Button variant='primary'>Waiting for Response</Button>
      break
    case 'inprogress':
      return <Button variant='warning'>In Progress</Button>
      break
    case 'success':
      return <Button variant='success'>Success</Button>
      break
    case 'fail':
      return <Button variant='danger'>Rejected</Button>
      break
    default:
      return <Button variant='danger'>Error</Button>
  }
}

export default StatusTags