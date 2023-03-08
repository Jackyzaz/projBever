import React, { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'

const GuestButton = () => {
    const [error, setError] =useState('')
    const {signIn} = UserAuth()

    const navigate = useNavigate()
    const handleSubmit1 = async (event) => {
        event.preventDefault();
        setError('')
        try {
            await signIn('guest1@guest.com', '123456')
            navigate('/dashboard')
        } catch (err) {
            alert(err.message)
            setError(err.message)
            console.log(err.message)
        }
    }
    const handleSubmit2 = async (event) => {
        event.preventDefault();
        setError('')
        try {
            await signIn('guest2@gmail.com', '123456')
            navigate('/dashboard')
        } catch (err) {
            alert(err.message)
            setError(err.message)
            console.log(err.message)
        }
    }
    const handleSubmit3 = async (event) => {
        event.preventDefault();
        setError('')
        try {
            await signIn('guest3@gmail.com', '123456')
            navigate('/dashboard')
        } catch (err) {
            alert(err.message)
            setError(err.message)
            console.log(err.message)
        }
    }
    return (
        <>
            <Stack>
                <Button className='mb-3' onClick={handleSubmit1}>Continued as Guest 1</Button>
                <Button className='mb-3' onClick={handleSubmit2}>Continued as Guest 2</Button>
                <Button className='mb-3' onClick={handleSubmit3}>Continued as Guest 3</Button>
            </Stack>
        </>
    )
}

export default GuestButton