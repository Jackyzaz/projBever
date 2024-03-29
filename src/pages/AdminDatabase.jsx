import { collection, getDocs, orderBy, query } from '@firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup, Pagination, Table } from 'react-bootstrap'
import ProblemTable from '../components/ProblemTable'
import { UserAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

const AdminDatabase = () => {
    const { user } = UserAuth()

    const [data, setData] = useState([])
    const [searchStatus, setSearchStatus] = useState('')
    const [searchProblem, setSearchProblem] = useState('');

    const [searchPage, setSearchPage] = useState(1);


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

    function goNextPage(step) {
        setSearchPage(searchPage + step)
    }

    function goPrevPage(step) {
        setSearchPage(searchPage - step)
    }

    return (
        <>
            <Container>
                <div className='mt-5'>
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
                <Pagination className='mt-3 text-center justify-content-center' variant='danger'>
                    <Pagination.First onClick={() => { setSearchPage(1) }} />
                    {searchPage - 1 == 0 ? <><Pagination.Prev /></> :
                        <>
                            <Pagination.Prev onClick={() => { goPrevPage(1) }} />
                            <Pagination.Item onClick={() => { goPrevPage(1) }}>{searchPage - 1}</Pagination.Item>
                        </>}

                    <Pagination.Item active onClick={fetchProblem}>{searchPage}</Pagination.Item>
                    <Pagination.Item onClick={() => { goNextPage(1) }}>{searchPage + 1}</Pagination.Item>

                    {searchPage + 3 > parseInt((data.length / 20).toFixed(0)) ? <></> :
                        <>
                            <Pagination.Item onClick={() => { goNextPage(2) }}>{searchPage + 2}</Pagination.Item>
                            <Pagination.Ellipsis />
                            <Pagination.Item onClick={() => { setSearchPage(parseInt((data.length / 20).toFixed(0))) }}>{(data.length / 20).toFixed(0)}</Pagination.Item>
                        </>}



                    <Pagination.Next onClick={() => { goNextPage(1) }} />
                    <Pagination.Last onClick={() => { setSearchPage(parseInt((data.length / 20).toFixed(0))) }} />
                </Pagination>
                <table className="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
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
                        }).slice((searchPage * 20) - 20, searchPage * 20).map((item, index) => {
                            console.log("🚀 ~ file: Dashboard.jsx:70 ~ {data?.map ~ item:", item)
                            return <ProblemTable item={item.data()} key={index} fetchy={fetchProblem} />
                        })}
                    </tbody>
                </table>
            </Container>
        </>

    )
}

export default AdminDatabase