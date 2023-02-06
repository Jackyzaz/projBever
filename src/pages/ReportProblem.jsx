import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'

function ReportProblem() {
    return (
        <>
            <h1 className='text-center mb-3'>Problem Reporter</h1>
            <Form className='d-grid'>
                <Form.Group className="mb-3" controlId="problem_name">
                    <Form.Label>Your Problem Name</Form.Label>
                    <Form.Control type="text" multi placeholder="Enter Your Problem Name ex. s" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Add Image</Form.Label>
                    <Form.Control type="file" multiple placeholder="Add Image" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="problem_name">
                    <Form.Label>Describe Problem</Form.Label>
                    <Form.Control as="textarea" type="text" placeholder="Describe Your Problem" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="problem_name">
                    <Form.Label>Tag Problem</Form.Label>
                    <Form.Control as="textarea" row={10} type="tag" placeholder="Describe Your Problem" />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Rate Problem</Form.Label>
                <Form.Range />
                </Form.Group>
                
                
                <Button className="mt-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default ReportProblem;