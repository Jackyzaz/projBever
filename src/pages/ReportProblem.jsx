import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import { Form, Button, Image } from 'react-bootstrap'
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import Tags from "@yaireo/tagify/dist/react.tagify"
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext'




function ReportProblem() {
    const {user} = UserAuth();

    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [problemName, setProblemName] = useState("");
    const [problemInfo, setProblemInfo] = useState("");
    const [problemTags, setProblemTags] = useState("");
    const [problemRate, setProblemRate] = useState(null);
    const tagifyRef = useRef()
    // on tag add/edit/remove
    
    const problemCollectionRef = collection(db, "/user_problems")
    const onTagChange = useCallback((e) => {
        console.log("CHANGED:", e.detail.tagify.getCleanValue() // Same as above, without the extra properties
        )
        setProblemTags(e.detail.tagify.getCleanValue())
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('')
        try {
          await addDoc(problemCollectionRef, {
            problemName,
            problemInfo,
            problemTags,
            problemRate,
            author: { email : user.email },
        })
          navigate('/dashboard')
        } catch (err) {
          alert(err.message)
          setError(err.message)
          console.log(err.message)
        }
      }

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    return (
        <>
            <h1 className='text-center mb-3'>Problem Reporter</h1>
            <Form className='d-grid' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="problem_name">
                    <Form.Label>Your Problem Name</Form.Label>
                    <Form.Control type="text" multi placeholder="Enter Your Problem Name ex. s" onChange={(event) => setProblemName(event.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Add Image</Form.Label>
                    <Form.Control type="file" multiple placeholder="Add Image" onChange={onImageChange}/>
                    {imageURLs.map((imageSrc, idx) => (
        <Image className="mt-3 border shadow-lg rounded" height={180} key={idx} src={imageSrc} />
      ))}
                </Form.Group>
                <Form.Group className="mb-3" controlId="problem_name">
                    <Form.Label>Describe Problem</Form.Label>
                    <Form.Control as="textarea" type="text" placeholder="Describe Your Problem" onChange={(event) => setProblemInfo(event.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="problem_name">
                    <Form.Label>Tag Problem</Form.Label>
                    <Tags
                        tagifyRef={tagifyRef} // optional Ref object for the Tagify instance itself, to get access to  inner-methods
                        defaultValue="ปัญหาโรงเรียน, ปัญหาห้องน้ำ, ปัญหาขยะ"
                        onChange={onTagChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Rate Problem</Form.Label>
                    <Form.Range onChange={(event) => setProblemRate(event.target.value)}/>
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default ReportProblem;