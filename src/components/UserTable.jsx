import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, Col, Form, Image, InputGroup, Modal, Row } from 'react-bootstrap';
import Plot from 'react-plotly.js';
import { db } from '../firebase';
import BenefitEst from './EstimatedOption/BenefitEst';
import CostEst from './EstimatedOption/CostEst';
import TimeEst from './EstimatedOption/TimeEst';
import StatusTags from './StatusTags';
import { UserAuth } from '../contexts/AuthContext';

const UserTable = ({ item, fetchy, key }) => {
    const { user } = UserAuth()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState('')

    const [previewImageURLs, setPreviewImageURLs] = useState(String(item.avatarURLs));
    const [firstname, setFirstName] = useState(item.firstname)
    const [lastname, setLastName] = useState(item.lastname)
    const [username, setUserName] = useState(item.username)
    const [email, setEmail] = useState(item.email)
    const [role, setRole] = useState(item.role)

    const userCollectionRef = collection(db, "/user_db")

    const handleUpdate = async (event) => {
        event.preventDefault()
        setError('')
        try {
            await setDoc(doc(userCollectionRef, item.email), {
                firstname,
                lastname,
                username,
                email: item.email,
                uid: item.uid,
                role: role,
                avatarURLs: previewImageURLs,
            })
            fetchy()
            handleClose()

        } catch (err) {
            alert(err.message)
            setError(err.message)
            console.log(err.message)
        }
    }

    return (
        <>
            <tr>
                <td>{item.uid}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td className='justify-content-center text-center'><RoleButton click={handleShow} role={item.role} /></td>
            </tr>

            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ 'fontWeight': 'bold' }}>Edit details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='justify-content-center text-center'>
                            <Image className="mb-3 rounded-circle" height={250} width={250} style={{ objectFit: 'cover' }}
                                src={previewImageURLs} />
                        </div>
                        <hr className=''></hr>

                        <Row>
                            <Col sm={6}>
                                <Form.Group className='mb-3'>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control value={firstname} placeholder='Enter your First Name' onChange={(event) => setFirstName(event.target.value)} >
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control value={lastname} placeholder='Enter your Last Name' onChange={(event) => setLastName(event.target.value)} >
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className='mb-3'>
                            <Row>
                                <Col sm={2}>
                                    <Form.Label>Username</Form.Label>
                                </Col>
                                <Col sm={12}>
                                    <Form.Control value={username} placeholder='Enter your Username' onChange={(event) => setUserName(event.target.value)} >
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Col>
                                <Form.Label>Email address</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control value={email} type="email" placeholder="Enter email" />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Col>
                                <Form.Label> Role </Form.Label>
                            </Col>
                            <Col>
                                <Form.Select value={role} onChange={(event) => { setRole(event.target.value) }}>
                                    <option >Changed Role</option>
                                    <option value="guest">Guest</option>
                                    <option value="member">Member</option>
                                    <option value="admin">Admin</option>
                                    <option value="academic">Academic</option>
                                    <option value="building">Building</option>
                                    <option value="welfare">Welfare</option>
                                    <option value="finace">Finace</option>
                                    <option value="sc">Student Council</option>
                                    <option value="director">Director</option>
                                </Form.Select>
                            </Col>
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
            </Modal >
        </>
    )
}

const RoleButton = (props) => {
    switch (props.role) {
        case 'guest':
            return <Button onClick={props.click} variant='primary'>Guest</Button>
        case 'member':
            return <Button onClick={props.click} variant='primary'>Member</Button>
        case 'admin':
            return <Button onClick={props.click} variant='danger'>Admin</Button>
        case 'academic':
            return <Button onClick={props.click} variant='success'>Academic</Button>
        case 'building':
            return <Button onClick={props.click} variant='success'>Building</Button>
        case 'welfare':
            return <Button onClick={props.click} variant='success'>Welfare</Button>
        case 'finace':
            return <Button onClick={props.click} variant='success'>Finace</Button>
        case 'sc':
            return <Button onClick={props.click} variant='success'>Student Concil</Button>
        case 'director':
            return <Button onClick={props.click} variant='success'>Director</Button>
        case '':
            return <Button onClick={props.click} variant='danger'>Error</Button>
        default:
            return <Button onClick={props.click} variant='danger'>Error</Button>
    }
}

export default UserTable