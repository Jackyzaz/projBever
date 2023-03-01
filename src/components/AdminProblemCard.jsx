import { MixedTags } from '@yaireo/tagify/dist/react.tagify'
import { useState } from 'react';
import { Button, Card, Row, Col, Image, Stack, Form, Modal, InputGroup } from 'react-bootstrap'
import StatusTags from './StatusTags';
import { setDoc, doc, collection, updateDoc, Timestamp, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebase'
import { UserAuth } from '../contexts/AuthContext';

const AdminProblemCard = ({ item, fetchy }) => {
  const { user } = UserAuth()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState('')
  const [orimts, setOrimts] = useState(item.mts)
  const [status, setStatus] = useState(item.status)
  const [mts, setMts] = useState('')
  const [costs, setCosts] = useState('')

  const problemCollectionRef = collection(db, "/user_problems")
  const handleUpdate = async (event) => {
    event.preventDefault()
    setError('')
    await updateDoc(doc(problemCollectionRef, item.problemUUID), {
      status: status,
      mts: mts,
      cost: costs,
    })
    fetchy()
    handleClose()
  }

  const deleteProblem = async () => {
    await deleteDoc(doc(problemCollectionRef, item.problemUUID))
    fetchy()
  }

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
            <Card.Title className="d-flex justify-content-start text-bold">{item.problemName}</Card.Title>
            <Card.Subtitle className="text-start text-muted mb-2">by {item.author.email}</Card.Subtitle>
            <Card.Subtitle className="text-start text-muted mb-2">{item.reportDate.toDate().toLocaleString()}</Card.Subtitle>
            <MixedTags className="my-2 text-start" readOnly value={`${tagifyTag}`} />
            <Card.Text className="text-start">{item.problemInfo}</Card.Text>
          </Col>
          <Col sm={2} className='my-4 mr-3'>
            <Stack gap={3} className='d-flex mx-4 justify-content-between'>
              <StatusTags status={item.status} />
              <Button onClick={handleShow} variant={`outline-${statusBorder(item.status)}`} >Resolve Problem</Button>
              <Button onClick={deleteProblem} variant={`outline-danger`} >Delete Post</Button>
            </Stack>

          </Col>
        </Row>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered >
        <Modal.Header closeButton>
          <Modal.Title style={{ 'fontWeight': 'bold' }}>Resolve Problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={2}>
              <p>Problem Name </p>

            </Col>
            <Col sm={10}>
              <p style={{ 'fontWeight': 'bold' }}>{item.problemName}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <p>Problem UUID</p>
            </Col>
            <Col sm={10}>
              <p style={{ 'fontWeight': 'bold' }}>{item.problemUUID}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <p>Report at</p>
            </Col>
            <Col sm={10}>
              <p style={{ 'fontWeight': 'bold' }}>{item.reportDate.toDate().toLocaleString()}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <p>Describe</p>
            </Col>
            <Col sm={10}>
              <p style={{ 'fontWeight': 'bold' }}>{item.problemInfo}</p>
            </Col>
          </Row>
          {item.imagesURLs.map((url) => {
            return <img className='m-auto my-3' src={url} width={300}></img>
          })}
        </Modal.Body>
        <hr className=''></hr>
        <Form onSubmit={handleUpdate}>
          <Modal.Body>
            <h4 style={{ 'fontWeight': 'bold' }} className='mb-4'>Resolve</h4>
            <Form.Group className='mb-3'>
              <Row>
                <Col sm={3}>
                  <Form.Label>Resolve Status</Form.Label>
                </Col>
                <Col sm={9}>
                  <Form.Select value={status} onChange={(event) => { setStatus(event.target.value) }}>
                    <option value="wait">Wait for Response</option>
                    <option value="inprogress">In Progress</option>
                    <option value="success">Success</option>
                    <option value="fail">Rejected</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row>
                <Col sm={3}>
                  <Form.Label>Massage to Sender</Form.Label>
                </Col>
                <Col sm={9}>
                  <Form.Control value={mts.massage} as="textarea" rows={3} onChange={(event) => {
                    setMts({
                      author: user.email,
                      restime: Timestamp.fromDate(new Date()),
                      massage: event.target.value
                    })
                    console.log(mts)
                  }} />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col sm={3}>
                  <Form.Label>Add Costs</Form.Label>
                </Col>
                <Col sm={9}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>฿</InputGroup.Text>
                    <Form.Control value={costs} onChange={(event) => { setCosts(event.target.value) }} />
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div >
  )
}


export default AdminProblemCard