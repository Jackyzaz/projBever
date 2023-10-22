import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'
import { Loading } from '../components/Loading'
import { UserAuth } from '../contexts/AuthContext'
import { setDoc, doc, collection, addDoc, updateDoc, Timestamp, getDocs, query, where } from 'firebase/firestore';
import { db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
  const { user } = UserAuth()
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0)

  const [error, setError] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [username, setUserName] = useState('')
  const [role, setRole] = useState('member')
  const [images, setImages] = useState([]);
  const [previewImageURLs, setPreviewImageURLs] = useState('/avatar.png');
  const [userInfo, setUserInfo] = useState([])


  useEffect(() => {
    if (images.length < 1) return;
    let thispreviewImageUrls = previewImageURLs;
    let tempImageUrls = '';
    images.forEach((image) => {
      thispreviewImageUrls = (URL.createObjectURL(image))
      tempImageUrls = (`avatar_image/${user.email}/${image.name}`)
      // console.log(tempImageUrls)
    });
    setPreviewImageURLs(thispreviewImageUrls);
  }, [images]);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  }

  const userCollectionRef = collection(db, "/user_db")

  const getUserInfo = useCallback(() => {
    const filtteredCollectionRef = query(userCollectionRef, where('email', '==', String(user.email)))
    getDocs(filtteredCollectionRef)
    // getDocs(filtteredCollectionRef).then(res => console.log(res.docs[0]))
    const getData = async () => {
      const res = await getDocs(filtteredCollectionRef)
      setUserInfo(res.docs.reverse());
      // console.log(previewImageURLs)
    }
    getData();
  }, [user])

  useEffect(() => {
    getUserInfo();
  }, [user])

  useEffect(() => {
    userInfo.map((item) => {
      setPreviewImageURLs(item.data().avatarURLs)
      // console.log(item.data().avatarURLs)
      setFirstName(item.data().firstname)
      setLastName(item.data().lastname)
      setUserName(item.data().username)
      setRole(item.data().role)
    })
  }, [userInfo])

  if (!user.uid) {
    return <Loading />
  }


  const handleUpload = () => {
    const promises = [];
    const ImageUrls = [];
    images.map((image) => {
      const userStorageRef = ref(storage, `avatar_image/${user.email}/${image.name}`)
      const uploadTask = uploadBytesResumable(userStorageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
            ImageUrls.push(urls)
            console.log("temp urls", ImageUrls);
            updateDoc(doc(userCollectionRef, user.email), {
              avatarURLs: ImageUrls
            })
          })

        }
      );
    });

    Promise.all(promises)
      .then(() => { if (Image != []) { alert("All image is upload!") } })
      .catch((err) => console.log(err));

  };

  const handleUpdate = async (event) => {
    event.preventDefault()
    setError('')
    try {
      if (images.length !== 0) handleUpload()
      await setDoc(doc(userCollectionRef, user.email), {
        firstname,
        lastname,
        username,
        email: user.email,
        uid: user.uid,
        role: role,
        avatarURLs: previewImageURLs,
      })

    } catch (err) {
      alert(err.message)
      setError(err.message)
      console.log(err.message)
    }
  }

  return (
    <Container className='my-5'>
      <h1>Profile Settings</h1>
      <Form onSubmit={handleUpdate}>
        <Row className='mt-4'>
          <Col xs={3}  >
            <Card className='p-3' >
              <Card.Title className='text-center text-bold'>
                Profile Image
              </Card.Title>
              <Card.Body className='text-center'>
                <Row>
                  <Image className="mb-3 rounded-circle" height={250} width={250} style={{ objectFit: 'cover' }} src={previewImageURLs} />
                </Row>
                <Row className='mx-3 mb-2'>
                </Row>
                <Form.Control type="file" placeholder="Add Image" onChange={handleChange}></Form.Control>
                <hr className=''></hr>
                <Row className='mx-1'>
                  <RoleButton role={role}></RoleButton>
                </Row>
              </Card.Body>

            </Card>
          </Col>
          <Col md={9} >
            <Card className='p-3'>
              <Card.Title>
                Personal Information
              </Card.Title>
              <hr className=''></hr>

              <Card.Body>
                <Row>
                  <Col sm={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control value={firstname} placeholder='Enter your First Name' onChange={(event) => setFirstName(event.target.value)} >
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control value={lastname} placeholder='Enter your Last Name' onChange={(event) => setLastName(event.target.value)} >
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className='mb-3'>
                  <Row>
                    <Col sm={2}>
                      <Form.Label>Username</Form.Label>
                    </Col>
                    <Col sm={12}>
                      <Form.Control value={username} placeholder='Enter your Username' onChange={(event) => setUserName(event.target.value)} >
                      </Form.Control>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Col>
                    <Form.Label>Email address</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control value={user.email} type="email" placeholder="Enter email" />
                  </Col>
                </Form.Group>
              </Card.Body>
              <hr className=''></hr>
              <Card.Body className='text-end'>
                <Button variant="outline-primary" type="submit">
                  Save Changes
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container >
  )
}

const RoleButton = (props) => {
  switch (props.role) {
    case 'guest':
      return <Button onClick={props.click} variant='primary'>Guest</Button>
    case 'member':
      return <Button onClick={props.click} variant='primary'>Membedirectorr</Button>
    case 'admin':
      return <Button onClick={props.click} variant='danger'>Admin</Button>
    case 'academic':
      return <Button onClick={props.click} variant='success'>Academic</Button>
    case 'building':
      return <Button onClick={props.click} variant='success'>Building</Button>
    case 'welfare':
      return <Button onClick={props.click} variant='success'>Welfare</Button>
    case 'finace':
      return <Button onClick={props.click} variant='success'>Finace</Button>
    case 'sc':
      return <Button onClick={props.click} variant='success'>Student Concil</Button>
    case 'director':
      return <Button onClick={props.click} variant='success'>Director</Button>
    case '':
      return <Button onClick={props.click} variant='danger'>Error</Button>
    default:
      return <Button onClick={props.click} variant='danger'>Error</Button>
  }
}

export default UserProfile