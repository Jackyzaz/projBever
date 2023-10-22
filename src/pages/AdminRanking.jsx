import { collection, doc, getDocs, orderBy, query, updateDoc } from '@firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { useImperativeHandle } from 'react'
import { Button, Container, Form, InputGroup, Pagination, Table } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import AdminProblemCard from '../components/AdminProblemCard'
import ProblemRankingTable from '../components/ProblemRankTable'
import ProblemTable from '../components/ProblemTable'
import { UserAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

const AdminRanking = () => {
    const { user } = UserAuth()

    const [data, setData] = useState([])
    const [searchStatus, setSearchStatus] = useState('')
    const [searchProblem, setSearchProblem] = useState('');

    const [error, setError] = useState('')

    const [searchPage, setSearchPage] = useState(1);

    const problemCollectionRef = collection(db, "/user_problems")


    const updatedata = () => {
        console.log('updaterank')
        data?.map((item) => {
            console.log('updaterank' + item.data().problemUUID)

            updateDoc(doc(problemCollectionRef, item.data().problemUUID), {
                RankingRate: parseFloat(Math.sqrt(Math.pow(item.data().problemRate.costs, 2)
                    + Math.pow(item.data().problemRate.time, 2)
                    + Math.pow(item.data().problemRate.bnf, 2)).toFixed(2)),
            })
        })
    }

    const fetchProblem = useCallback(() => {
        const problemCollectionRef = collection(db, "user_problems")
        const adminProblemRef = query(problemCollectionRef, orderBy("RankingRate"))
        getDocs(adminProblemRef).then(res => console.log(res.docs[0]))
        const getData = async () => {
            const res = await getDocs(adminProblemRef)
            setData(res.docs.reverse());
        }
        getData();
        // updatedata();
    }, [user])

    useEffect(() => {
        fetchProblem();
    }, [user])

    function goNextPage(step) {
        setSearchPage(parseInt(searchPage) + step)
        console.log(searchPage)
    }

    function goPrevPage(step) {
        setSearchPage(parseInt(searchPage) - step)
        console.log(searchPage)
    }

    let Array_cost = []
    let Array_time = []
    let Array_bnf = []

    return (
        <>
            {data?.map((item, index) => {
                Array_cost.push(item.data().problemRate.costs)
                Array_time.push(item.data().problemRate.time)
                Array_bnf.push(item.data().problemRate.bnf)
            })}
            <Container>
                <div className='mt-5'>
                    <div className='d-flex justify-content-center mb-4'>
                        <h1>Problem Ranking</h1>
                    </div>
                    <div className='text-center'>
                        <Plot
                            data={[
                                {
                                    x: Array_cost,
                                    y: Array_time,
                                    z: Array_bnf,
                                    mode: 'markers',
                                    marker: {
                                        size: 15,
                                        line: {
                                            color: 'rgba(217, 217, 217, 0.14)',
                                            width: 0.5
                                        },
                                        opacity: 0.8
                                    },
                                    type: 'scatter3d'
                                }, 
                                {
                                    x: Array_cost,
                                    y: Array_time,
                                    z: Array_bnf,
                                    mode: 'markers',
                                    marker: {
                                        size: 15,
                                        line: {
                                            color: 'rgba(217, 217, 217, 0.14)',
                                            width: 0.5
                                        },
                                        opacity: 0.4
                                    },
                                    opacity: 0.2,
                                    type: 'mesh3d'
                                }]}
                            layout={
                                {
                                    margin: {
                                        l: 10,
                                        r: 10,
                                        b: 20
                                    },
                                    title: '3D Scatter & Cluster Problem',
                                    xaxis: {
                                        title: {
                                          text: 'xdwad Axis',
                                          font: {
                                            family: 'Courier New, monospace',
                                            size: 18,
                                            color: '#7f7f7f'
                                          }
                                        },
                                      },
                                      yaxis: {
                                        title: {
                                          text: 'ydawd Axis',
                                          font: {
                                            family: 'Courier New, monospace',
                                            size: 18,
                                            color: '#7f7f7f'
                                          }
                                        }
                                      },
                                      zaxis: {
                                        title: {
                                          text: 'x Adwadxis',
                                          font: {
                                            family: 'Courier New, monospace',
                                            size: 18,
                                            color: '#7f7f7f'
                                          }
                                        },
                                      },
                                      zaxis: {
                                        title: {
                                          text: 'z Axis',
                                          font: {
                                            family: 'Courier New, monospace',
                                            size: 18,
                                            color: '#7f7f7f'
                                          }
                                        }
                                      }
                                }
                            }
                        />
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
            </Container>
            <Table className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
                <thead>

                    <tr>
                        <th className='justify-content-center text-center align-middle' rowSpan="2">Report Date</th>
                        <th className='justify-content-center text-center align-middle' rowSpan="2">Problem Name</th>
                        <th className='justify-content-center text-center' colSpan="3">Estimated Rank</th>
                        <th className='justify-content-center text-center align-middle' rowSpan="2">Ranking Rate</th>
                        <th className='justify-content-center text-center align-middle' rowSpan="2">Edit Estimated</th>
                    </tr>
                    <tr>
                        <th className='justify-content-center text-center'>Costs</th>
                        <th className='justify-content-center text-center'>Time</th>
                        <th className='justify-content-center text-center'>Benefits</th>
                    </tr>
                    <tr>
                    </tr>
                </thead>
                <tbody>

                    {data?.filter(item => {
                        return !item.data().status.includes('deleted')
                    }).filter(item => {
                        return item.data().status.includes(searchStatus)
                    }).slice((searchPage * 20) - 20, searchPage * 20).map((item, index) => {
                        return <ProblemRankingTable item={item.data()} key={index} fetchy={fetchProblem} />
                    })}
                </tbody>
            </Table>
        </>

    )
}

export default AdminRanking