import { MixedTags } from '@yaireo/tagify/dist/react.tagify'
import React from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom';

import { Badge, Button, Card, Col, Container, Form, Row, Stack } from 'react-bootstrap'

const LostnFoundCenter = () => {
    return (
        <Container className='my-5'>
            <h1 className='text-center'>Lost & Found Center</h1>
            <div className="mt-3 text-center">
            <Button as={Link} to="/reportproblem" className="m-2" variant="primary">Report & Request</Button>
          </div>
            <div className='my-3'>
                <div className='text-center'>
                    <Form>
                        <Stack direction="horizontal" gap={2}>
                            <Form.Control border='primary' onChange={(e) => {
                                setSearchProblem(e.target.value)
                                console.log(searchProblem)
                            }
                            } value='' className="me-auto" placeholder="Find Your Lost Here" />

                            <div className="vr" />
                            <Button variant="primary">&#8635;</Button>
                        </Stack>
                    </Form>
                </div>
                <hr className='text-center my-3' ></hr>

                <div className='justify-content-center'>
                    <Row>
                        <Col>
                            <Card style={{ width: '25rem' }} className='mt-4 box ' border='danger'>
                                <Card.Img className='' style={{ height: '15rem', objectFit: 'cover' }} variant="top" src='https://i.ibb.co/51kyQTf/carkey.jpg' />
                                <Card.Body>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <Card.Title className="d-flex">กุญแจหายช่วยด้วย &nbsp;<Badge bg="danger">Lost</Badge></Card.Title>
                                            <Card.Subtitle className="text-start text-muted">by john@me.com at 1/3/2023, 4:12:41 AM</Card.Subtitle>
                                        </div>
                                        <Button variant='danger' >Contact Author</Button>
                                    </div>
                                    <Card.Text className="text-start mt-3">ผมทำกุญแจรถหายที่โรงอาหารหายช่วยด้วยครับ</Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '25rem' }} className='mt-4 box ' border='success'>
                                <Card.Img className='' style={{ height: '15rem', objectFit: 'cover' }} variant="top" src='https://i.ibb.co/TrNTF2C/wallet.webp' />
                                <Card.Body>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <Card.Title className="d-flex">Whose Wallet? &nbsp;<Badge bg="success">Found</Badge></Card.Title>
                                            <Card.Subtitle className="text-start text-muted">by jame@email.com at 3/3/2023, 1:12:41 AM</Card.Subtitle>
                                        </div>
                                        <Button variant='success' >Contact Author</Button>
                                    </div>
                                    <Card.Text className="text-start mt-3">พบเจอกระเป๋าตังค์ ในเป๋ามีเงินเยอะมากคะ</Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '25rem' }} className='mt-4 box ' border='success'>
                                <Card.Img className='' style={{ height: '15rem', objectFit: 'cover' }} variant="top" src='https://i.ibb.co/Q6CbMy5/iphone.jpg' />
                                <Card.Body>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <Card.Title className="d-flex">Iphone 14 จร้า&nbsp;<Badge bg="success">Found</Badge></Card.Title>
                                            <Card.Subtitle className="text-start text-muted">by shada@gmail.com at 3/3/2023, 1:12:41 AM</Card.Subtitle>
                                        </div>
                                        <Button variant='success' >Contact Author</Button>
                                    </div>
                                    <Card.Text className="text-start mt-3">พบเจอไอโพนสิบสี่นะค่ะ มารับคืนได้อิอิ</Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card style={{ width: '25rem' }} className='mt-4 box ' border='success'>
                                <Card.Img className='' style={{ height: '15rem', objectFit: 'cover' }} variant="top" src='https://i.ibb.co/9c3jgnW/ipad.jpg' />
                                <Card.Body>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <Card.Title className="d-flex">Ipad ของใคร&nbsp;<Badge bg="success">Found</Badge></Card.Title>
                                            <Card.Subtitle className="text-start text-muted">by emi@zeed.com at 3/3/2023, 1:12:41 AM</Card.Subtitle>
                                        </div>
                                        <Button variant='success' >Contact Author</Button>
                                    </div>
                                    <Card.Text className="text-start mt-3">Ipad ของใครพึ่งซื้อมาเอาไปคืนจร้า</Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '25rem' }} className='mt-4 box ' border='danger'>
                                <Card.Img className='' style={{ height: '15rem', objectFit: 'cover' }} variant="top" src='https://i.ibb.co/p11KLmB/sweater.jpg' />
                                <Card.Body>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <Card.Title className="d-flex">Sweater หาย&nbsp;<Badge bg="danger">Lost</Badge></Card.Title>
                                            <Card.Subtitle className="text-start text-muted">by sweet@me.com at 3/3/2023, 1:12:41 AM</Card.Subtitle>
                                        </div>
                                        <Button variant='danger' >Contact Author</Button>
                                    </div>
                                    <Card.Text className="text-start mt-3">ช่วยด้วยคะ เสื้อกันหนาวหายที่ห้อง 902</Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '25rem' }} className='mt-4 box ' border='danger'>
                                <Card.Img className='' style={{ height: '15rem', objectFit: 'cover' }} variant="top" src='https://i.ibb.co/7W9k0Jc/necklace.jpg' />
                                <Card.Body>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <Card.Title className="d-flex">สร้อยคอทองคำ&nbsp;<Badge bg="danger">Lost</Badge></Card.Title>
                                            <Card.Subtitle className="text-start text-muted">by somsri@hotmai.com at 3/3/2023, 1:12:41 AM</Card.Subtitle>
                                        </div>
                                        <Button variant='danger' >Contact Author</Button>
                                    </div>
                                    <Card.Text className="text-start mt-3">ใครพบสร้อยทอง 2 บาทบ้างคะ</Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>

        </Container>
    )
}

export default LostnFoundCenter