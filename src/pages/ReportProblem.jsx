import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import { Form, Button, Image, Container, Row, Col } from 'react-bootstrap'
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import Tags from "@yaireo/tagify/dist/react.tagify"
import { setDoc, doc, collection, addDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";
import { Loading } from '../components/Loading';

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
    const [problemRate, setProblemRate] = useState({ costs: 5, time: 5, bnf: 3 });
    const [problemRateCosts, setProblemRateCosts] = useState(5);
    const [problemRateTime, setProblemRateTime] = useState(5);
    const [problemRateBnf, setProblemRateBnf] = useState(3);
    const [images, setImages] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);
    const [previewImageURLs, setPreviewImageURLs] = useState([]);



    if (!user.uid) {
        return <Loading />
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
        images.forEach((image) => {
            previewImageUrls.push(URL.createObjectURL(image))
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
        let rankingrate = parseFloat(Math.sqrt(Math.pow(problemRateCosts, 2)
        + Math.pow(problemRateTime, 2)
        + Math.pow(problemRateBnf, 2))).toFixed(2)
        try {
            // console.log(imagesURLs)
            if (images.length !== 0) handleUpload()
            await setDoc(doc(problemCollectionRef, problemUUID), {
                problemUUID,
                problemName,
                problemInfo,
                problemTags,
                problemRate: { costs: problemRateCosts, time: problemRateTime, bnf: problemRateBnf },
                RankingRate: parseFloat(rankingrate),
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
                    <hr />
                    <h2 className='text-center my-3'>Rate your Problem</h2>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Budget Estimation</Form.Label>
                                <Form.Select value={problemRateCosts} onChange={(event) => { setProblemRateCosts(event.target.value) }} >
                                    <option value={1}> No Cost</option>
                                    <option value={2}>&le; 100 &#3647; </option>
                                    <option value={3}>100 ~ 300 &#3647;</option>
                                    <option value={4}>300 ~ 500 &#3647;</option>
                                    <option value={5}>500 ~ 1000 &#3647;</option>
                                    <option value={6}>1000 ~ 1500 &#3647;</option>
                                    <option value={7}>1500 ~ 3000 &#3647;</option>
                                    <option value={8}>3000 ~ 5000 &#3647;</option>
                                    <option value={9}>&ge; 5000 &#3647;</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Time EstimatiDDDon</Form.Label>
                                <Form.Select value={problemRateTime} onChange={(event) => { setProblemRateTime(event.target.value) }} >
                                    <option value={1}>As Fast As Possible</option>
                                    <option value={2}>Within an Hour</option>
                                    <option value={3}>Within 3 Hours</option>
                                    <option value={4}>Within 8 Hours</option>
                                    <option value={5}>Within 1 Day</option>
                                    <option value={6}>Within 3 Days</option>
                                    <option value={7}>Within 1 Week</option>
                                    <option value={8}>Within 3 Weeks</option>
                                    <option value={9}>Within 1 Months</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Benefits Estimation</Form.Label>
                                <Form.Select value={problemRateBnf} onChange={(event) => { setProblemRateBnf(event.target.value) }} >
                                    <option value={6}>Myself</option>
                                    <option value={5}>Some people</option>
                                    <option value={4}>a Group of people</option>
                                    <option value={3}>Some Group of people</option>
                                    <option value={2}>Most people in school</option>
                                    <option value={1}>Everyone in school</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>


                    <Button className="mt-3" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default ReportProblem;