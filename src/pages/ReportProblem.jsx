import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import { Form, Button, Image } from 'react-bootstrap'
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import Tags from "@yaireo/tagify/dist/react.tagify"
import { addDoc, collection } from 'firebase/firestore';
import { db, auth, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';




function ReportProblem() {
    
    const {user} = UserAuth();
    const navigate = useNavigate();
    const tagifyRef = useRef()
    
    const [error, setError] = useState('')
    const [progress, setProgress] = useState(0)

    const [images, setImages] = useState([]); 
    const [imagesURLs, setImagesURLs] = useState([]);
    const [previewImageURLs, setPreviewImageURLs] = useState([]);
    const [problemName, setProblemName] = useState("");
    const [problemInfo, setProblemInfo] = useState("");
    const [problemTags, setProblemTags] = useState("");
    const [problemRate, setProblemRate] = useState(null);
    
    
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
        setPreviewImageURLs(newImageUrls);
        setImagesURLs(newImageUrls)
    }, [images]);
    
    function onImageChange(e) {
        setImages([...e.target.files]);
    }
    
    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };
    
    const handleUpload = () => {
        const promises = [];
        images.map((image) => {
            const problemStorageRef = ref(storage, `images/${image.name}`)
            const uploadTask = uploadBytesResumable(problemStorageRef, image);
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
              console.log(error);
            },
            () => {
             getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
                    // setImagesURLs((prevState) => [...prevState, urls]);s
                    console.log('File available at', urls)
                })
            }
          );
        });
    
        Promise.all(promises)
          .then(() => alert("All images uploaded"))
          .catch((err) => console.log(err));
      };
    
      console.log("images: ", images);
      console.log("urls", imagesURLs);

    return (
        <>
            <h1 className='text-center mb-3'>Problem Reporter</h1>
            <Form className='d-grid' onSubmit={handleUpload}>
                <Form.Group className="mb-3" controlId="problem_name">
                    <Form.Label>Your Problem Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Problem Name ex. s" onChange={(event) => setProblemName(event.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Add Image</Form.Label>
                    <Form.Control type="file" multiple placeholder="Add Image" onChange={handleChange}/>
                    {previewImageURLs.map((imageSrc, idx) => (
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