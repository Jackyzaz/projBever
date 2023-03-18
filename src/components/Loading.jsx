import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

export const Loading = () => {
    return (
        <>
            <Container className='mt-5 justify-content-center text-center'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h5>Loading</h5>
            </Container>
            

        </>
    )
}
