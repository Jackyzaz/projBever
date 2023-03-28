import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const ConsultantCenter = () => {
    return (
        <>
            <section style={{ backgroundColor: '#eee;' }} className='p-3'>
                <Row>

                    <Col xs={3}>


                        <div className="card">
                            <div className="card-body">

                                <ul className="list-unstyled mb-0">
                                    <li className="p-2 border-bottom" style={{ backgroundColor: '#eee;' }}>
                                        <a href="#!" className="d-flex justify-content-between">
                                            <div className="d-flex flex-row">
                                                <img src="https://i.ibb.co/f9JDqjt/laura.webp" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} alt="avatar"
                                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" />
                                                <div className="pt-1">
                                                    <p className="fw-bold mb-0">Kru Laura</p>
                                                    <p className="small text-muted">Hello! How are you?</p>
                                                </div>
                                            </div>
                                            <div className="pt-1">
                                                <p className="small text-muted mb-1">Just now</p>
                                                <span className="badge bg-danger float-end">1</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="p-2 border-bottom" >
                                        <a href="#!" class="d-flex justify-content-between">
                                            <div class="d-flex flex-row">
                                                <img src="https://i.ibb.co/D9hQqTp/adminavatar.png" alt="avatar" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }}
                                                    class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" />
                                                <div class="pt-1">
                                                    <p class="fw-bold mb-0">Admin Danny</p>
                                                    <p class="small text-muted">We have recieved your problem!</p>
                                                </div>
                                            </div>
                                            <div class="pt-1">
                                                <p class="small text-muted mb-1">5 mins ago</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </Col>

                    <Col>

                        <ul className="list-unstyled">
                            <li className="d-flex justify-content-start mb-4">
                                <img src="https://i.ibb.co/f9JDqjt/laura.webp" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} alt="avatar"
                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" />
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between p-3">
                                        <p className="fw-bold mb-0">Kru Laura</p>
                                        <p className="text-muted small mb-0"><i className="far fa-clock"></i> 12 mins ago</p>
                                    </div>
                                    <div className="card-body">
                                        <p className="mb-0">
                                         Hey, I'm here to help you. You can consult me anything..
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="d-flex justify-content-end mb-4">
                                <div className="card w-10">
                                    <div className="card-header d-flex justify-content-between p-3">
                                        <p className="fw-bold mb-0">You</p>
                                        <p className="text-muted small mb-0"><i className="far fa-clock"></i> 13 mins ago</p>
                                    </div>
                                    <div className="card-body">
                                        <p className="mb-0">
                                        I have a mental problem. Would you like to ask your teacher if you can help me?
                                        </p>
                                    </div>
                                </div>
                                <img src="https://i.ibb.co/kh4pfTY/avatar.png" alt="avatar"
                                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60" />
                            </li>
                            <li className="d-flex justify-content-start mb-4">
                                <img src="https://i.ibb.co/f9JDqjt/laura.webp" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} alt="avatar"
                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" />
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between p-3">
                                        <p className="fw-bold mb-0">Kru Laura</p>
                                        <p className="text-muted small mb-0"><i className="far fa-clock"></i> 10 mins ago</p>
                                    </div>
                                    <div className="card-body">
                                        <p className="mb-0">
                                        Of course Why don't you try to say it?
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="bg-white mb-3">
                                <div className="form-outline">
                                    <textarea className="form-control" placeholder='Massage' id="textAreaExample2" rows="4"></textarea>
                                </div>
                            </li>
                            <button type="button" className="btn btn-primary btn-rounded float-end">Send</button>
                        </ul>
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default ConsultantCenter