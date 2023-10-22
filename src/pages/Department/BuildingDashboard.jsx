import React, { useCallback, useEffect, useState } from 'react'
import { Button, CardGroup, Col, Container, Form, InputGroup, Pagination, Row, Stack } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom';
import ProblemCard from '../../components/ProblemCard';
import { UserAuth } from '../../contexts/AuthContext';
import { collection, doc, getDocs, query, where, deleteDoc, Timestamp, orderBy, limit } from 'firebase/firestore'
import { db, auth, storage } from '../../firebase'
import AdminProblemCard from '../../components/AdminProblemCard';

const BuildingDashboard = () => {
  const { user, logout } = UserAuth();
  const [data, setData] = useState([]);
  const [searchProblem, setSearchProblem] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const [searchPage, setSearchPage] = useState(1);


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

  function goNextPage(step) {
    setSearchPage(searchPage + step)
  }

  function goPrevPage(step) {
    setSearchPage(searchPage - step)
  }

  return (
    <>
      <Container className='my-5'>
        <h1 className='text-center'>Department Dashboard</h1>
        <div className='mt-3 text-center'>
          <h5>Departmant Email : {user && user.email}</h5>
          <div className="mt-3">
          </div>
        </div>
        <hr className='text-center mt-5' ></hr>
        <div className='mt-5'>
          <div className='d-flex justify-content-center mb-4'>
            <h1>Building Problem Monitor</h1>
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
              <Button onClick={fetchProblem} variant="success">&#8635;</Button>
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
        <Row className='justify-content-center text-center'>
          {data?.filter(item => {
            return !item.data().status.includes('deleted')
          }).filter(item => {
            return item.data().department?.includes('building')
          }).filter(item => {
            return item.data().status.includes(searchStatus)
          }).filter(item => {
            return item.data().problemName.includes(searchProblem)
          }).slice((searchPage * 12) - 12, searchPage * 12).map((item, index) => {
            console.log("🚀 ~ file: Dashboard.jsx:70 ~ {data?.map ~ item:", item)
            return <Col sm={12} md={7} xl={5} xxl={4}><AdminProblemCard item={item.data()} key={index} fetchy={fetchProblem} /></Col>
          })}
        </Row>
      </Container>
    </>
  )
}

export default BuildingDashboard