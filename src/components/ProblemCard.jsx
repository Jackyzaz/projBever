import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
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
  };
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(userProblemRef);
      setProblemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);
  return (
    <>  
    {problemList.map((problem) => {
        return (
          <Card className='mt-3'>
              <Card.Body>
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {problem.problemName}</h1>
              </div>
              <div className="deletePost">
                {user && problem.author.name === user.uid && (
                  <button onClick={() => { deletePost(problem.uuid) }}>
                    Delete Problem
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {problem.postText} </div>
            <p>ProblemUUID : {problem.problemUUID}</p>
            <p>@{problem.author.name}</p>
          </div>
          </Card.Body>
          </Card>
        );
      })}
      </>
  )
}


export default ProblemCard