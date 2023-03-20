import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'
import { useNavigate, Link, Navigate } from 'react-router-dom';
import ProblemCard from '../components/ProblemCard';
import { UserAuth } from '../contexts/AuthContext';
import { collection, doc, getDocs, query, where, deleteDoc, Timestamp } from 'firebase/firestore'
import { db, auth, storage } from '../firebase'
import { Loading } from '../components/Loading';

const Dashboard = () => {
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

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      console.log('You are logged out')
    } catch (err) {
      alert(err.message)
      console.log(err.message)
    }
  }


  return (
    <>
      <Container className='my-5'>
        <h1 className='text-center'>Dashboard</h1>
        <div className='mt-3 text-center'>
          <h5>User Email : {user && user.email}</h5>
          <div className="mt-3">
            <Button onClick={handleLogout} className="m-2" variant="primary">Sign out</Button>
            <Button as={Link} to="/reportproblem" className="m-2" variant="primary">ProblemReporter</Button>
          </div>
          <hr className='text-center mt-5' ></hr>

          <div className='my-5'>
            <div className='d-flex justify-content-center mb-4'>
              <h1>Your Problem Status</h1>
            </div>
            <Form>
              <Stack direction="horizontal" gap={3}>
                <Form.Control border='primary' onChange={(e) => {
                  setSearchProblem(e.target.value)
                  console.log(searchProblem)
                }
                } value={searchProblem} className="me-auto" placeholder="Search By Problem Name" />
                <Form.Select value={searchStatus} onChange={(event) => { setSearchStatus(event.target.value) }}>
                  <option value="">Search by Status</option>
                  <option value="wait">Wait for Response</option>
                  <option value="inprogress">In Progress</option>
                  <option value="success">Success</option>
                  <option value="fail">Rejected</option>
                </Form.Select>
                <div className="vr" />
                <Button onClick={fetchProblem} variant="primary">&#8635;</Button>
              </Stack>
            </Form>
          </div>



        </div>
          {data?.filter(item => {
            return !item.data().status.includes('deleted')
          }).filter(item => {
            return item.data().status.includes(searchStatus)
          }).filter(item => {
            return item.data().problemName.includes(searchProblem)
          }).map((item, index) => {
            console.log("🚀 ~ file: Dashboard.jsx:70 ~ {data?.map ~ item:", item)
            return <ProblemCard item={item.data()} key={index} />
          })}
      </Container>
    </>
  )
}

export default Dashboard