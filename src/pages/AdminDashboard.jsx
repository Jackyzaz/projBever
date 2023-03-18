import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row, Stack } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom';
import ProblemCard from '../components/ProblemCard';
import { UserAuth } from '../contexts/AuthContext';
import { collection, doc, getDocs, query, where, deleteDoc, Timestamp, orderBy, limit } from 'firebase/firestore'
import { db, auth, storage } from '../firebase'
import AdminProblemCard from '../components/AdminProblemCard';


const AdminDashboard = () => {
  const { user, logout } = UserAuth();
  const [data, setData] = useState([]);
  const [searchProblem, setSearchProblem] = useState('');
  const [searchStatus, setSearchStatus] = useState('');


  const navigate = useNavigate();


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

  return (
    <>
      <Container className='my-5'>
        <h1 className='text-center'>Admin Dashboard</h1>
        <div className='mt-3 text-center'>
          <h5>Admin Email : {user && user.email}</h5>
          <div className="mt-3">
          </div>
        </div>
        <hr className='text-center mt-5' ></hr>
        <div className='my-5'>
          <div className='d-flex justify-content-center mb-4'>
            <h1>School Problem Monitor</h1>
          </div>
          <Form>

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
          return !item.data().status.includes('deleted')
        }).filter(item => {
          return item.data().status.includes(searchStatus)
        }).filter(item => {
          return item.data().problemName.includes(searchProblem)
        }).map((item, index) => {
          console.log("🚀 ~ file: Dashboard.jsx:70 ~ {data?.map ~ item:", item)
          return <AdminProblemCard item={item.data()} key={index} fetchy={fetchProblem} />
        })}
      </Container>
    </>
  )
}

export default AdminDashboard