import { MixedTags } from '@yaireo/tagify/dist/react.tagify'
import { useState } from 'react';
import { Button, Card, Row, Col, Image, Stack, Form, Modal } from 'react-bootstrap'
import StatusTags from './StatusTags';

const ProblemCard = ({ item }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let tagifyTag = ''
  item.problemTags.forEach(element => {
    tagifyTag = tagifyTag + `[[${JSON.stringify(element)}]]` + ' '
  });

  const statusBorder = (status) => {
    switch (status) {
      case 'wait':
        return 'primary'
      case 'inprogress':
        return 'warning'
      case 'success':
        return 'success'
      case 'fail':
        return 'danger'
      default:
        return 'danger'
    }
  }
  
  return (
    <div>
      <Card className='mt-4 box' border={statusBorder(item.status)}>
        <Row>
          <Col sm={3}>
            <img className='img-fluid rounded-start' src={(item.imagesURLs[0] !== undefined) ? item.imagesURLs[0] : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'} />
          </Col>
          <Col sm={7} className='my-4'>
            <Card.Title className="d-flex justify-content-start">{item.problemName}</Card.Title>
            <Card.Subtitle className="text-start text-muted">{item.reportDate.toDate().toLocaleString()}</Card.Subtitle>
            <MixedTags className="my-2 text-start" readOnly value={`${tagifyTag}`} />
            <Card.Text className="text-start">{item.problemInfo}</Card.Text>
          </Col>
          <Col sm={2} className='d-flex my-4 mr-3'>
            <Stack gap={2} className='mx-4'>
              <StatusTags status={item.status} />
              <Button onClick={handleShow} variant={`outline-${statusBorder(item.status)}`} >View Detail</Button>

            </Stack>

          </Col>
        </Row>
      </Card>
      <Modal show={show} onHide={handleClose}size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered >
        <Modal.Header closeButton>
          <Modal.Title style={{'fontWeight':'bold'}}>{item.problemName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Report at <span style={{'fontWeight':'bold'}}>{item.reportDate.toDate().toLocaleString()}</span> by <span style={{'fontWeight':'bold'}}>{item.author.email}</span>
        <p>Describe <span style={{'fontWeight':'bold'}}>{item.problemInfo}</span></p></Modal.Body>
          {item.imagesURLs.map((url) => {
            console.log(url);
            return <img className='m-auto my-3' src={url} width={300}></img>
          })}
      </Modal>
    </div>
  )
}


export default ProblemCard