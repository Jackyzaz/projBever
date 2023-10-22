import { collection, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import Plot from 'react-plotly.js';
import { db } from '../firebase';
import BenefitEst from './EstimatedOption/BenefitEst';
import CostEst from './EstimatedOption/CostEst';
import TimeEst from './EstimatedOption/TimeEst';
import StatusTags from './StatusTags';

const ProblemTable = ({ item, fetchy, key }) => {
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
                <Form onSubmit={handleUpdate}>
                    <Modal.Body>

                        <hr className=''></hr>
                        <Form.Group className='mb-3'>
                            <Row>
                                <Col sm={3} className='mb-3'>
                                    <Form.Label>Budget Estimation</Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Select value={item.problemRate.costs} disabled
                                        size='sm' onChange={(event) => { setProblemRateCosts(event.target.value) }} >
                                        <CostEst />
                                    </Form.Select>
                                </Col>
                                <Col sm={3} className='mb-3'>
                                    <Form.Label>Time Estimation</Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Select value={item.problemRate.time} size='sm' disabled
                                        onChange={(event) => { setProblemRateTime(event.target.value) }} >
                                        <TimeEst />
                                    </Form.Select>
                                </Col>
                                <Col sm={3} className='mb-3'>
                                    <Form.Label>Benefits Estimation</Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Select value={item.problemRate.bnf} size='sm' disabled
                                        onChange={(event) => { setProblemRateBnf(event.target.value) }} >
                                        <BenefitEst />
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>
                        <div className='text-center'>
                            <Plot
                                data={[
                                    {
                                        type: 'scatterpolar',
                                        r: [10 - item.problemRate.costs, 10 - item.problemRate.time, item.problemRate.bnf / 6 * 9],
                                        theta: ['Cost', 'Time', 'Benefits'],
                                        fill: 'toself'
                                    },
                                ]}
                                layout={{
                                    polar: {
                                        radialaxis: {
                                            visible: true,
                                            range: [0, 9]
                                        }
                                    },
                                    showlegend: false, width: '3rem', height: 500, title: 'Estimated'
                                }}
                            />
                        </div>
                    </Modal.Body>
                    <hr className=''></hr>
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
                                        <option value="deleted">Deleted</option>

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