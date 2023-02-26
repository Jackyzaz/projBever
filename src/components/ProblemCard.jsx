import Tags, { MixedTags } from '@yaireo/tagify/dist/react.tagify'
import { collection, doc, getDocs, query, where, deleteDoc, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Col, Image, Stack, Form } from 'react-bootstrap'
import { UserAuth } from '../contexts/AuthContext'
import { db, auth, storage } from '../firebase'
import StatusTags from './StatusTags'

const ProblemCard = () => {
  const { user } = UserAuth()
  const userid = user.uid;

  const [problemList, setProblemList] = useState([])
  const [reloadButton, setReloadButton] = useState(0)
  const [searchProblem, setSearchProblem] = useState('')
  const [imagestemp, setImagestemp] = useState('')
  // const testRef = ref(storage, 'problems_images/qwerty@gmail.com/2fc3e949-2fe9-4d4e-b7ec-a670c53e2198/Screenshot 2022-09-22 222116.png')
  // const urlimg = getDownloadURL(testRef).then((url) => {
  //   return url
  // })

  const problemCollectionRef = collection(db, "user_problems")
  const userProblemRef = query(problemCollectionRef, where("author.name", "==", String(userid)))
  // const userProblemRef = query(problemCollectionRef, where("problemName", "==", "dw"))

  const deletePost = async (id) => {
    const problemDoc = doc(db, "user_problems", id);
    await deleteDoc(problemDoc);
    console.log(problemDoc)
  };

  const fetchProblem = () => {
    const getPosts = async () => {
      const data = await getDocs(userProblemRef);
      setProblemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
    console.log(problemList)
  }
  useEffect(fetchProblem, [reloadButton]);

  const filteredProblemList = problemList.filter((problem) => {
    return problem.problemName.includes(searchProblem)
  })

  // const problemImgfetch = () => {
  //   let problemImgSrc = []
  //   const storageRef = ref(storage, 'problems_images/qwerty@gmail.com/2a2c536e-8f9c-4649-9cb8-aec27616b5b8/Cylinder.png')
  //   getDownloadURL(storageRef).then((link) => { problemImgSrc.push(link) })
  //   // console.log(`ImageSrc : ${problemImgSrc}`)
  // }

  // problemImgfetch('problems_images/qwerty@gmail.com/2a2c536e-8f9c-4649-9cb8-aec27616b5b8/Cylinder.png')

  // const tagFetch = () => {
  //   const Tags = problem.problemTags

  // }

  return (
    <>
      <div className='my-5'>
        <div className='d-flex justify-content-center mb-3'>
          <h1>Your Problem Status</h1>
        </div>
        <Form>
          <Stack direction="horizontal" gap={3}>
            <Form.Control onChange={(e) => setSearchProblem(e.target.value)} value={searchProblem} className="me-auto" placeholder="Search by problem name" />
            <div className="vr" />
            <Button onClick={fetchProblem} variant="outline-primary">&#8635;</Button>
          </Stack>
        </Form>
      </div>

      {filteredProblemList.map((problem, idx) => {
        // return (
        //   <Card className='mt-3 rounded-3' key={idx} >
        //     <Card.Body>
        //       <Card.Img variant='top' src={'/'}></Card.Img>
        //       <Card.Title className='align-items-start'>{problem.problemName}</Card.Title>
        //       <div className="post">
        //         <div className="postHeader">
        //           <div className="deletePost">
        //             {user && problem.author.name === user.uid && (
        //               <Button onClick={() => { deletePost(problem.id) }}>
        //                 Delete Problem
        //               </Button>
        //             )}
        //           </div>
        //         </div>
        //         <div className="postTextContainer"> {problem.postText} </div>
        //         <p>ProblemUUID : {problem.problemUUID}</p>
        //         <p>@{problem.author.name}</p>
        //         <p>Email : {problem.author.email}</p>
        //       </div>
        //     </Card.Body>
        //   </Card>
        // );

        const reportTimestamp = problem.reportDate
        const dateTemp = reportTimestamp * 1000
        const displayDate = new Date(problem.reportDate * 1000).toUTCString()

        let myNumberOfStr = ''
        problem.problemTags.forEach(element => {
          myNumberOfStr = myNumberOfStr + `[[${JSON.stringify(element)}]]` + ' '
        });
        
        return (
          <Card className='mt-3 box' key={idx}>
            <Row>
              <Col sm={3}>
                {/* <Card.Img className="img-fluid rounded-start" src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" /> */}
                <img className='img-fluid rounded-start' src={(problem.imagesURLs[0] !== undefined) ? problem.imagesURLs[0] : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'} />
              </Col>
              <Col sm={7} className='my-4'>
                <Card.Title className="d-flex justify-content-start">{problem.problemName}</Card.Title>
                <Card.Subtitle className="text-start text-muted">{reportTimestamp.toDate().toLocaleString()}</Card.Subtitle>
                <MixedTags className="my-2 text-start" readOnly value={`${myNumberOfStr}`} />
                <Card.Text className="text-start">{problem.problemInfo}</Card.Text>
              </Col>
              <Col sm={2} className='d-flex my-4 mr-3'>
                <Stack gap={2} className='mx-4'>
                <StatusTags status={problem.status}/>
                <Button>View Detail</Button>
                </Stack>
              </Col>
            </Row>
          </Card>
        )
      })
      }
    </>
  )
}


export default ProblemCard