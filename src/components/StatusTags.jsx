import React from 'react'
import { Button } from 'react-bootstrap'

const StatusTags = (props) => {

  console.log(props.status)
  // if (props.status === 'wait') {
  //   return (
  //     <Button variant='warning'>wait</Button>
  //   )
  // } else (props.status === 're') {
  //   re
  // }

  switch (props.status) {
    case 'wait':
      return <Button variant='outline-warning'>Waiting for Response</Button>
      break
    case 'inprogress':
      return <Button variant='warning'>In Progress</Button>
      break
    case 'success':
      return <Button variant='success'>Success</Button>
      break
    case 'fail':
      return <Button variant='danger'>Fail</Button>
      break
    default:
      return <Button variant='danger'>Error</Button>
  }
}

export default StatusTags