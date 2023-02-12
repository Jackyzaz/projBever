import { collection, doc, getDocs, query, where, deleteDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Col } from 'react-bootstrap'
import { UserAuth } from '../contexts/AuthContext'
import { db, auth } from '../firebase'

const ProblemCard = () => {
  const { user } = UserAuth()
  const userid = user.uid;


  const problemCollectionRef = collection(db, "user_problems")
  const userProblemRef = query(problemCollectionRef, where("author.name", "==", String(userid)))
  // const userProblemRef = query(problemCollectionRef, where("problemName", "==", "dw"))
  const [problemList, setProblemList] = useState([])

  const deletePost = async (id) => {
    const problemDoc = doc(db, "user_problems", id);
    await deleteDoc(problemDoc);
    console.log(problemDoc)
  };
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(userProblemRef);
      setProblemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
    console.log(problemList)
  }, [problemList]);

  return (
    <>
      {problemList.map((problem) => {
        return (
          <Card className='mt-3 rounded-3' key={""}>
            <Card.Body>
              <Card.Img variant='top' src={problem.imagesURLs[0]}></Card.Img>
            <Card.Title className='align-items-start'>{problem.problemName}</Card.Title>
              <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {problem.problemName}</h1>
              </div>
              <div className="deletePost">
                {user && problem.author.name === user.uid && (
                  <Button onClick={() => { deletePost(problem.id) }}>
                    Delete Problem
                  </Button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {problem.postText} </div>
            <p>ProblemUUID : {problem.problemUUID}</p>
            <p>@{problem.author.name}</p>
            <p>Email : {problem.author.email}</p>
          </div>
            </Card.Body>
          </Card>
        );
      })}
    </>
  )
}


export default ProblemCard