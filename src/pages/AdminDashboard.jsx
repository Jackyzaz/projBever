import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Stack } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom';
import ProblemCard from '../components/ProblemCard';
import { UserAuth } from '../contexts/AuthContext';
import { collection, doc, getDocs, query, where, deleteDoc, Timestamp } from 'firebase/firestore'
import { db, auth, storage } from '../firebase'
import AdminProblemCard from '../components/AdminProblemCard';


const AdminDashboard = () => {
  const { user, logout } = UserAuth();
  const [data, setData] = useState([]);
  const [searchProblem, setSearchProblem] = useState('');
  const [searchStatus, setSearchStatus] = useState('');


  const navigate = useNavigate();
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

  const fetchProblem = useCallback(() => {
    const problemCollectionRef = collection(db, "user_problems")
    const userProblemRef = query(problemCollectionRef, where("author.name", "==", String(user.uid)))
    getDocs(problemCollectionRef).then(res => console.log(res.docs[0]))
    const getData = async () => {
      const res = await getDocs(problemCollectionRef)
      setData(res.docs);
    }
    getData();
  }, [user])

  useEffect(() => {
    fetchProblem();
  }, [user])

  return (
    <>
      <h1 className='text-center'>Admin Dashboard</h1>
      <div className='mt-3 text-center'>
        <h5>Admin Email : {user && user.email}</h5>
        <div className="mt-3">
        </div>
        <hr className='text-center mt-5' ></hr>
      </div>
      <div className='my-5'>
        <div className='d-flex justify-content-center mb-4'>
          <h1>School Problem Monitor</h1>
        </div>
        <Form>
          {/* <Row className='d-flex justify-content-between'>
            <Col sm={9}>
              <Form.Control border='primary' onChange={(e) => setSearchProblem(e.target.value)} className="me-auto" placeholder="Search By Problem Name" />
            </Col>
            <Col sm={2}>
              <Form.Select value={searchStatus} onChange={(event) => { setSearchStatus(event.target.value) }}>
                <option value="">Search by Status</option>
                <option value="wait">Wait for Response</option>
                <option value="inprogress">In Progress</option>
                <option value="success">Success</option>
                <option value="fail">Rejected</option>
              </Form.Select>
            </Col>
            <Col sm={1}>
            <Button onClick={fetchProblem} variant="danger">&#8635;</Button>
            </Col>
          </Row> */}
          <InputGroup>
            <Form.Control
              placeholder="Search by Problem Name"
              onChange={(e) => setSearchProblem(e.target.value)}
            />
            <Form.Select value={searchStatus} onChange={(event) => { setSearchStatus(event.target.value) }}>
                <option value="">Search by Status</option>
                <option value="wait">Wait for Response</option>
                <option value="inprogress">In Progress</option>
                <option value="success">Success</option>
                <option value="fail">Rejected</option>
              </Form.Select>
              <Button onClick={fetchProblem} variant="danger">&#8635;</Button>
          </InputGroup>
        </Form>
      </div>

      {data?.filter(item => {
        return item.data().status.includes(searchStatus)
      }).filter(item => {
        return item.data().problemName.includes(searchProblem)
      }).map((item, index) => {
        console.log("🚀 ~ file: Dashboard.jsx:70 ~ {data?.map ~ item:", item)
        return <AdminProblemCard item={item.data()} key={index} fetchy={fetchProblem} />
      })}
    </>
  )
}

export default AdminDashboard