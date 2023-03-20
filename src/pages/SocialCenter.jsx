import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'
import { useNavigate, Link, Navigate } from 'react-router-dom';
import ProblemCard from '../components/ProblemCard';
import { UserAuth } from '../contexts/AuthContext';
import { collection, doc, getDocs, query, where, deleteDoc, Timestamp } from 'firebase/firestore'
import { db, auth, storage } from '../firebase'
import { Loading } from '../components/Loading';
import SocialProblemCard from '../components/SocialProblemCard';

const SocialCenter = () => {
    const { user, logout } = UserAuth();
    const [data, setData] = useState([]);
    const [searchProblem, setSearchProblem] = useState('');
    const [searchStatus, setSearchStatus] = useState('');


    const navigate = useNavigate();


    const fetchProblem = useCallback(() => {
        const problemCollectionRef = collection(db, "user_problems")
        const userProblemRef = query(problemCollectionRef, where("author.name", "==", String(user.uid)))
        getDocs(userProblemRef).then(res => console.log(res.docs[0]))
        const getData = async () => {
            const res = await getDocs(userProblemRef)
            setData(res.docs);
        }
        getData();
    }, [user])

    useEffect(() => {
        fetchProblem();
    }, [user])


    if (!user.uid) {
        return <Loading />
    }

    if (user.isAdmin) {
        return <Navigate to='/admin/dashboard' />
    }




    return (
        <>
            <Container className='my-5'>
                <h1 className='text-center'>Social Problem</h1>
                <div className='my-3'>
                    <div className='text-center'>
                        <Form>
                            <Stack direction="horizontal" gap={2}>
                                <Form.Control border='primary' onChange={(e) => {
                                    setSearchProblem(e.target.value)
                                    console.log(searchProblem)
                                }
                                } value={searchProblem} className="me-auto" placeholder="Search By Problem Name" />
                               
                                <div className="vr" />
                                <Button onClick={fetchProblem} variant="primary">&#8635;</Button>
                            </Stack>
                        </Form>
                    </div>
                    <hr className='text-center my-3' ></hr>



                </div>
                <div className='justify-content-center'>
                {data?.filter(item => {
                    return !item.data().status.includes('deleted')
                }).filter(item => {
                    return item.data().status.includes(searchStatus)
                }).filter(item => {
                    return item.data().problemName.includes(searchProblem)
                }).map((item, index) => {
                    console.log("🚀 ~ file: Dashboard.jsx:70 ~ {data?.map ~ item:", item)
                    return <SocialProblemCard item={item.data()} key={index} />
                })}
                </div>
            </Container>
        </>
    )
}

export default SocialCenter