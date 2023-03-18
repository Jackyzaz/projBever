import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import StatusTags from './StatusTags';

const ProblemTable = ({ item, fetchy }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [error, setError] = useState('')
    const [orimts, setOrimts] = useState(item.mts)
    const [status, setStatus] = useState(item.status)
    const [mts, setMts] = useState('')
    const [costs, setCosts] = useState('')

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

    return (
        <>
            <tr>
                <td>{item.reportDate.toDate().toLocaleString()}</td>
                <td>{item.problemName}</td>
                <td>{item.author.email}</td>
                <td className='justify-content-center text-center'><StatusTags click={handleShow} status={item.status} /></td>
            </tr>

            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title style={{ 'fontWeight': 'bold' }}>Resolve Problem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                            <p>Problem Name </p>

                        </Col>
                        <Col sm={10}>
                            <p style={{ 'fontWeight': 'bold' }}>{item.problemName}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <p>Report by</p>
                        </Col>
                        <Col sm={10}>
                            <p style={{ 'fontWeight': 'bold' }}>{item.author.email}</p>
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
        </>
    )
}

export default ProblemTable