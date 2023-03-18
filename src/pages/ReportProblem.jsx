import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import { Form, Button, Image, Container } from 'react-bootstrap'
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import Tags from "@yaireo/tagify/dist/react.tagify"
import { setDoc, doc, collection, addDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";

function ReportProblem() {

    const { user } = UserAuth();
    const navigate = useNavigate();
    const tagifyRef = useRef()

    const [error, setError] = useState('')
    const [progress, setProgress] = useState(0)

    const [problemUUID, setProblemUUID] = useState(v4())
    const [problemName, setProblemName] = useState("");
    const [problemInfo, setProblemInfo] = useState("");
    const [problemTags, setProblemTags] = useState("");
    const [problemRate, setProblemRate] = useState(null);
    const [images, setImages] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);
    const [previewImageURLs, setPreviewImageURLs] = useState([]);



    if (!user.uid) {
        return <h1> Loading </h1>
      }
    
    if (user.isAdmin) {
        return <Navigate to='/admin/dashboard' />
      }

    // on tag add/edit/remove

    const problemCollectionRef = collection(db, "/user_problems")

    const onTagChange = useCallback((e) => {
        console.log("CHANGED:", e.detail.tagify.getCleanValue() // Same as above, without the extra properties
        )
        setProblemTags(e.detail.tagify.getCleanValue())
    }, [])


    useEffect(() => {
        if (images.length < 1) return;
        const previewImageUrls = [];
        const tempImageUrls = [];
        images.forEach((image) => {previewImageUrls.push(URL.createObjectURL(image))
            tempImageUrls.push(`problems_images/${user && user.email}/${problemUUID}/${image.name}`)
            console.log(tempImageUrls)
        });
        setPreviewImageURLs(previewImageUrls);
        // setImagesURLs(tempImageUrls)
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
        const ImageUrls = [];
        images.map((image) => {
            const problemStorageRef = ref(storage, `problems_images/${user && user.email}/${problemUUID}/${image.name}`)
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
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
                        ImageUrls.push(urls)
                        console.log("temp urls", ImageUrls);
                        updateDoc(doc(problemCollectionRef, problemUUID), {
                            imagesURLs: ImageUrls
                        })
                    })
                    
                }
            );
        });

        Promise.all(promises)
        .then(() => { if (Image != []) { alert("All image is upload!") } })
        .catch((err) => console.log(err));
        
        // setImagesURLs(ImageUrls);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('')
        try {
            // console.log(imagesURLs)
            if (images.length !== 0) handleUpload()
            await setDoc(doc(problemCollectionRef, problemUUID), {
                problemUUID,
                problemName,
                problemInfo,
                problemTags,
                problemRate,
                status: 'wait',
                imagesURLs: [],
                costs: [],
                mts: {},
                reportDate: Timestamp.fromDate(new Date()),                
                author: { email: user.email, name: user.uid },
            })
            navigate('/dashboard')
        } catch (err) {
            alert(err.message)
            setError(err.message)
            console.log(err.message)
        }
    }
    console.log("images: ", images);
    console.log("urls", imagesURLs);

    return (
        <>
            <Container className='my-5'>
            <h1 className='text-center mb-3'>Problem Reporter</h1>
            <Form className='d-grid' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="problem_name">
                    <Form.Label>Your Problem Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Problem Name ex. s" onChange={(event) => setProblemName(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Add Image</Form.Label>
                    <Form.Control type="file" multiple placeholder="Add Image" onChange={handleChange} />
                    {previewImageURLs.map((imageSrc, idx) => (
                        <Image className="mt-3 border shadow-lg rounded" height={180} key={idx} src={imageSrc} />
                    ))}
                </Form.Group>
                <Form.Group className="mb-3" controlId="problem_name">
                    <Form.Label>Describe Problem</Form.Label>
                    <Form.Control as="textarea" type="text" placeholder="Describe Your Problem" onChange={(event) => setProblemInfo(event.target.value)} />
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
                    <Form.Range onChange={(event) => setProblemRate(event.target.value)} />
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </Container>
        </>
    )
}

export default ReportProblem;