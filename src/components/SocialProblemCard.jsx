import { MixedTags } from '@yaireo/tagify/dist/react.tagify'
import { useState } from 'react';
import { Button, Card, Row, Col, Image, Stack, Form, Modal, Badge } from 'react-bootstrap'
import StatusTags from './StatusTags';

const SocialProblemCard = ({ item }) => {
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

    const statusForm = (status) => {
        switch (status) {
            case 'wait':
                return 'Wait for Response'
            case 'inprogress':
                return 'In Progress'
            case 'success':
                return 'Success'
            case 'fail':
                return 'Fail'
            default:
                return 'Error'
        }
    }

    return (
        <div>
            <Card style={{ width: '70rem' }} className='mt-4 box mx-auto' border='primary'>
                <Card.Img style={{ height: '35rem', objectFit: 'cover'}} variant="top" src={(item.imagesURLs[0] !== undefined) ? item.imagesURLs[0] : 'https://www.teamgroup.co.th/wp-content/themes/consultix/images/no-image-found-360x260.png'} />
                <Card.Body>
                    <div className='d-flex justify-content-between'>
                        <div>
                    <Card.Title className="d-flex">{item.problemName}	&nbsp;<Badge bg="primary">Public</Badge></Card.Title>
                    <Card.Subtitle className="text-start text-muted">by {item.author.email} at {item.reportDate.toDate().toLocaleString()}</Card.Subtitle>
                        </div>
                    <Button  onClick={handleShow} variant='primary' >View Detail</Button>
                    </div>
                    <MixedTags className="my-3 text-start" readOnly value={`${tagifyTag}`} />
                    <Card.Text className="text-start">{item.problemInfo}</Card.Text>
                    <hr></hr>
                    <Form>
                            <Stack direction="horizontal" gap={2}>
                                <Form.Control border='primary' onChange={(e) => {
                                    setSearchProblem(e.target.value)
                                    console.log(searchProblem)
                                }
                                } value='' className="me-auto" placeholder={'Add a Public Comment to ' + item.author.email} />
                               
                                <div className="vr" />
                                <Button variant="light"><h6>{item.problemRate.time*8}</h6><img style={{ width: '2rem' }} src='https://cdn-icons-png.flaticon.com/512/25/25297.png'/></Button>
                            </Stack>
                        </Form>
                </Card.Body>


            </Card>
            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title style={{ 'fontWeight': 'bold' }}>Problem Info</Modal.Title>
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
                    {item.imagesURLs.map((url, idx) => {
                        return <img key={idx} className='mb-3 mr-3' src={url} width={300}></img>
                    })}
                </Modal.Body>
                {item.mts.author ? <ResolveMassage item={item} statusForm={statusForm} /> : ''}
            </Modal>
        </div>
    )
}

const ResolveMassage = ({ item, statusForm }) => {
    return (
        <>
            <hr className=''></hr>
            <Modal.Body>
                <h4 style={{ 'fontWeight': 'bold' }} className='mb-4'>Resolve from Admin</h4>
                <Row>
                    <Col sm={3}>
                        <p>Resolve by </p>
                    </Col>
                    <Col sm={9}>
                        <p style={{ 'fontWeight': 'bold' }}>{item.mts.author}</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <p>Resolve at</p>

                    </Col>
                    <Col sm={9}>
                        <p style={{ 'fontWeight': 'bold' }}>{item.mts.restime.toDate().toLocaleString()}</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <p>Massage from Admin</p>
                    </Col>
                    <Col sm={9}>
                        <p style={{ 'fontWeight': 'bold' }}>{item.mts.massage}</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <p>Status</p>
                    </Col>
                    <Col sm={9}>
                        <p style={{ 'fontWeight': 'bold' }}>{statusForm(item.status)}</p>
                    </Col>
                </Row>
            </Modal.Body>
        </>
    )
}

export default SocialProblemCard