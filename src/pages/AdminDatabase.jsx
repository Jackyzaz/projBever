import { collection, getDocs, orderBy, query } from '@firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup, Table } from 'react-bootstrap'
import AdminProblemCard from '../components/AdminProblemCard'
import ProblemTable from '../components/ProblemTable'
import { UserAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

const AdminDatabase = () => {
    const { user } = UserAuth()

    const [data, setData] = useState([])
    const [searchStatus, setSearchStatus] = useState('')
    const [searchProblem, setSearchProblem] = useState('');


    const fetchProblem = useCallback(() => {
        const problemCollectionRef = collection(db, "user_problems")
        const adminProblemRef = query(problemCollectionRef, orderBy("reportDate"))
        getDocs(adminProblemRef).then(res => console.log(res.docs[0]))
        const getData = async () => {
            const res = await getDocs(adminProblemRef)
            setData(res.docs.reverse());
        }
        getData();
    }, [user])

    useEffect(() => {
        fetchProblem();
    }, [user])

    useEffect(() => {
        fetchProblem();
    }, [user])

    return (
        <>
            <Container>
                <div className='my-5'>
                    <div className='d-flex justify-content-center mb-4'>
                        <h1>Problem Database</h1>
                    </div>
                    <Form>

                        <InputGroup>

                            <Form.Select value={searchStatus} onChange={(event) => { setSearchStatus(event.target.value) }}>
                                <option value="">Search by Status</option>
                                <option value="wait">Wait for Response</option>
                                <option value="inprogress">In Progress</option>
                                <option value="success">Success</option>
                                <option value="fail">Rejected</option>
                                <option value="deleted">Deleted</option>
                            </Form.Select>
                            <Button onClick={fetchProblem} variant="danger">&#8635;</Button>
                        </InputGroup>
                    </Form>
                </div>
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th className='justify-content-center text-center'>Report Date</th>
                        <th className='justify-content-center text-center'>Problem Name</th>
                        <th className='justify-content-center text-center'>User Email</th>
                        <th className='justify-content-center text-center'>Status</th>
                    </tr>
                </thead>
                <tbody>

                    {data?.filter(item => {
                        return item.data().status.includes(searchStatus)
                    }).map((item, index) => {
                        console.log("🚀 ~ file: Dashboard.jsx:70 ~ {data?.map ~ item:", item)
                        return <ProblemTable item={item.data()} key={index} fetchy={fetchProblem} />
                    })}
                </tbody>
            </Table>
            </Container>
        </>

    )
}

export default AdminDatabase