import { collection, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { db } from '../firebase';
import StatusTags from './StatusTags';

const ProblemRankingTable = ({ item, fetchy, key }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [error, setError] = useState('')
    const [orimts, setOrimts] = useState(item.mts)
    const [status, setStatus] = useState(item.status)
    const [mts, setMts] = useState('')
    const [costs, setCosts] = useState('')

    const [problemRate, setProblemRate] = useState({ costs: 5, time: 5, bnf: 3 });
    const [problemRateCosts, setProblemRateCosts] = useState(item.problemRate.costs);
    const [problemRateTime, setProblemRateTime] = useState(item.problemRate.time);
    const [problemRateBnf, setProblemRateBnf] = useState(item.problemRate.bnf);

    const problemCollectionRef = collection(db, "/user_problems")
    const handleUpdate = async (event) => {
        event.preventDefault()
        setError('')
        await updateDoc(doc(problemCollectionRef, item.problemUUID), {
            status: status,
            mts: mts,
            cost: costs,
            problemRate: { costs: problemRateCosts, time: problemRateTime, bnf: problemRateBnf },

        })
        fetchy()
        handleClose()
    }

    return (
        <>
            <tr>
                <td>{item.reportDate.toDate().toLocaleString()}</td>
                <td>{item.problemName}</td>
                {item.problemRate === null ? (
                    <td>nulll</td>
                ) : (
                    typeof item.problemRate === 'object' ? (
                        <td>
                            <Form.Select value={problemRateCosts} disabled size='sm' onChange={(event) => { setProblemRateCosts(event.target.value) }} >
                                <option value="1"> No Cost</option>
                                <option value="2">&le; 100 &#3647; </option>
                                <option value="3">100 ~ 300 &#3647;</option>
                                <option value="4">300 ~ 500 &#3647;</option>
                                <option value="5">500 ~ 1000 &#3647;</option>
                                <option value="6">1000 ~ 1500 &#3647;</option>
                                <option value="8">1500 ~ 3000 &#3647;</option>
                                <option value="9">3000 ~ 5000 &#3647;</option>
                                <option value="10">&ge; 5000 &#3647;</option>
                            </Form.Select>
                        </td>
                    ) : (
                        <td>{item.problemRate}</td>
                    )
                )}
                {item.problemRate === null ? (
                    <td>nulll</td>
                ) : (
                    typeof item.problemRate === 'object' ? (
                        <td>
                            <Form.Select value={problemRateTime} disabled size='sm'
                                onChange={(event) => { setProblemRateTime(event.target.value) }} >
                                <option value="1">As Fast As Possible</option>
                                <option value="2">Within an Hour</option>
                                <option value="3">Within 3 Hours</option>
                                <option value="4">Within 8 Hours</option>
                                <option value="5">Within 1 Day</option>
                                <option value="6">Within 3 Days</option>
                                <option value="8">Within 1 Week</option>
                                <option value="9">Within 3 Weeks</option>
                                <option value="10">Within 1 Months</option>
                            </Form.Select>
                        </td>

                    ) : (
                        <td>{item.problemRate}</td>
                    )
                )}
                {item.problemRate === null ? (
                    <td>nulll</td>
                ) : (
                    typeof item.problemRate === 'object' ? (
                        <td>
                            <Form.Select value={problemRateTime} disabled size='sm'
                                onChange={(event) => { setProblemRateBnf(event.target.value) }} >
                                <option value="6">Myself</option>
                                <option value="5">Some people</option>
                                <option value="4">a Group of people</option>
                                <option value="3">Some Group of people</option>
                                <option value="2">Most people in school</option>
                                <option value="1">Everyone in school</option>
                            </Form.Select>
                        </td>

                    ) : (
                        <td>{item.problemRate}</td>
                    )
                )}
                {/* <td>{item.problemRate.costs ? item.problemRate.costs : 0}</td> */}
                {/* <td>{item.problemRate.time}</td>
                <td>{item.problemRate.bnf}</td> */}
                <td></td>
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
                        <h4 style={{ 'fontWeight': 'bold' }} className='mb-4'>Estimated Rate</h4>
                        <Form.Group className='mb-3'>
                            <Row>
                                <Col sm={3} className='mb-3'>
                                    <Form.Label>Budget Estimation</Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Select value={problemRateCosts} onChange={(event) => { setProblemRateCosts(event.target.value) }} >
                                        <option value="1"> No Cost</option>
                                        <option value="2">&le; 100 &#3647; </option>
                                        <option value="3">100 ~ 300 &#3647;</option>
                                        <option value="4">300 ~ 500 &#3647;</option>
                                        <option value="5">500 ~ 1000 &#3647;</option>
                                        <option value="6">1000 ~ 1500 &#3647;</option>
                                        <option value="8">1500 ~ 3000 &#3647;</option>
                                        <option value="9">3000 ~ 5000 &#3647;</option>
                                        <option value="10">&ge; 5000 &#3647;</option>
                                    </Form.Select>
                                </Col>
                                <Col sm={3} className='mb-3'>
                                    <Form.Label>Time Estimation</Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Select value={problemRateTime} onChange={(event) => { setProblemRateTime(event.target.value) }} >
                                        <option value="1">As Fast As Possible</option>
                                        <option value="2">Within an Hour</option>
                                        <option value="3">Within 3 Hours</option>
                                        <option value="4">Within 8 Hours</option>
                                        <option value="5">Within 1 Day</option>
                                        <option value="6">Within 3 Days</option>
                                        <option value="8">Within 1 Week</option>
                                        <option value="9">Within 3 Weeks</option>
                                        <option value="10">Within 1 Months</option>
                                    </Form.Select>
                                </Col>
                                <Col sm={3} className='mb-3'>
                                    <Form.Label>Benefits Estimation</Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Select value={problemRateBnf} onChange={(event) => { setProblemRateBnf(event.target.value) }} >
                                        <option value="6">Myself</option>
                                        <option value="5">Some people</option>
                                        <option value="4">a Group of people</option>
                                        <option value="3">Some Group of people</option>
                                        <option value="2">Most people in school</option>
                                        <option value="1">Everyone in school</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>
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

export default ProblemRankingTable