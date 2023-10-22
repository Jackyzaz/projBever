import { collection, getDocs, orderBy, query, where } from '@firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup, Pagination, Table } from 'react-bootstrap'
import { UserAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import UserTable from '../components/UserTable'

const UserDatabase = () => {
    const { user } = UserAuth()

    const [data, setData] = useState([])
    const [searchStatus, setSearchStatus] = useState('')
    const [searchEmail, setSearchEmail] = useState('');

    const [searchPage, setSearchPage] = useState(1);

    const userCollectionRef = collection(db, "/user_db")

    const getUserInfo = useCallback(() => {
        getDocs(userCollectionRef).then(res => console.log(res.docs[0]))
        const getData = async () => {
            const res = await getDocs(userCollectionRef)
            setData(res.docs.reverse());
        }
        getData();
    }, [user])

    useEffect(() => {
        getUserInfo();
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
                        <h1>User Database</h1>
                    </div>
                    <Form>
                        <InputGroup>
                            <Form.Control border='primary' onChange={(e) => {
                                setSearchEmail(e.target.value)
                            }
                            } value={searchEmail} className="me-auto" placeholder="Search By User Email" />
                            <Button onClick={getUserInfo} variant="danger">&#8635;</Button>
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

                    <Pagination.Item active onClick={getUserInfo}>{searchPage}</Pagination.Item>
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
                            <th className='justify-content-center text-center'>User ID</th>
                            <th className='justify-content-center text-center'>Email</th>
                            <th className='justify-content-center text-center'>Username</th>
                            <th className='justify-content-center text-center'>FirstName</th>
                            <th className='justify-content-center text-center'>LastName</th>
                            <th className='justify-content-center text-center'>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.filter(item => {
                        return item.data().email.includes(searchEmail)
                    }).slice((searchPage * 20) - 20, searchPage * 20).map((item, index) => {
                        console.log("🚀 ~ file: Dashboard.jsx:70 ~ {data?.map ~ item:", item)
                        return <UserTable item={item.data()} key={index} fetchy={getUserInfo} />
                    })}
                    </tbody>
                </table>
            </Container>
        </>

    )
}

export default UserDatabase