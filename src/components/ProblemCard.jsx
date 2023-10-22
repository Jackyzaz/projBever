import { MixedTags } from '@yaireo/tagify/dist/react.tagify'
import { useState } from 'react';
import { Button, Card, Row, Col, Image, Stack, Form, Modal } from 'react-bootstrap'
import Plot from 'react-plotly.js';
import BenefitEst from './EstimatedOption/BenefitEst';
import CostEst from './EstimatedOption/CostEst';
import TimeEst from './EstimatedOption/TimeEst';
import StatusTags from './StatusTags';

const ProblemCard = ({ item }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    // console.log(`status => ${item.status}`) log ver
    switch (item.status) {
      case 'wait':
        // console.log('set blue') log ver
        document.documentElement.style.setProperty('--progress', '#0d6efd')
        break
      case 'inprogress':
        // console.log('set yellow') log ver
        document.documentElement.style.setProperty('--progress', '#ffc107')
        break
      case 'success':
        // console.log('set green') logv er
        document.documentElement.style.setProperty('--progress', '#198754')
        break
      default:
        // console.log('set red') log ver
        document.documentElement.style.setProperty('--progress', 'red')
        break
    } setShow(true)
  };

  let tagifyTag = ''
  item.problemTags.forEach(element => {
    tagifyTag = tagifyTag + `[[${JSON.stringify(element)}]]` + ' '
  });

  const statusBorder = (status) => {
    switch (status) {
      case 'wait':
        return 'primary'
      case 'inprogress':
        return 'warning'
      case 'success':
        return 'success'
      case 'fail':
        return 'danger'
      default:
        return 'danger'
    }
  }

  const statusForm = (status) => {
    switch (status) {
      case 'wait':
        return 'Wait for Response'
      case 'inprogress':
        return 'In Progress'
      case 'success':
        return 'Success'
      case 'fail':
        return 'Fail'
      default:
        return 'Error'
    }
  }



  return (
    <div>
      <Card className='mt-4 box shadow mb-5 bg-white rounded' border={statusBorder(item.status)}>
        <Row>
          <Col sm={6} md={3} xl={3} >
            <img className='img-fluid rounded' src={(item.imagesURLs[0] !== undefined) ? item.imagesURLs[0] : 'https://www.teamgroup.co.th/wp-content/themes/consultix/images/no-image-found-360x260.png'} />
          </Col>
          <Col sm={6} md={6} xl={6} className='my-4'>
            <Card.Title className="d-flex justify-content-start">{item.problemName}</Card.Title>

            <Card.Subtitle className="text-start text-muted">{item.reportDate.toDate().toLocaleString()}</Card.Subtitle>
            <MixedTags className="my-3 text-start" readOnly value={`${tagifyTag}`} />
            <Card.Text className="text-start">{item.problemInfo}</Card.Text>
          </Col>
          <Col sm={2} md={3} xl={3} className='d-flex my-4 mr-3'>
            <Stack gap={2} className='mx-4'>
              <StatusTags status={item.status} />
              <Button onClick={handleShow} variant={`outline-${statusBorder(item.status)}`} >View Detail</Button>

            </Stack>

          </Col>
        </Row>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered >
        <Modal.Header closeButton>
          <Modal.Title style={{ 'fontWeight': 'bold' }}>Problem Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className='text-center' style={{ 'fontWeight': 'bold' }}>Progression</h4>
          <ProgressLine item={item} status={item.status} />
          <hr className=''></hr>

          <Row>
            <Col sm={2}>
              <p>Problem Name </p>

            </Col>
            <Col sm={10}>
              <p style={{ 'fontWeight': 'bold' }}>{item.problemName}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <p>Report at</p>
            </Col>
            <Col sm={10}>
              <p style={{ 'fontWeight': 'bold' }}>{item.reportDate.toDate().toLocaleString()}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <p>Describe</p>
            </Col>
            <Col sm={10}>
              <p style={{ 'fontWeight': 'bold' }}>{item.problemInfo}</p>
            </Col>
          </Row>
          {item.imagesURLs.map((url, idx) => {
            return <img key={idx} className='mb-3 mr-3' src={url} width={300}></img>
          })}
          <hr className=''></hr>
          <Form.Group className='mb-3'>
            <Row>
              <Col sm={3} className='mb-3'>
                <Form.Label>Budget Estimation</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Select value={item.problemRate.costs} disabled
                  size='sm' onChange={(event) => { setProblemRateCosts(event.target.value) }} >
                  <CostEst />
                </Form.Select>
              </Col>
              <Col sm={3} className='mb-3'>
                <Form.Label>Time Estimation</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Select value={item.problemRate.time} size='sm' disabled
                  onChange={(event) => { setProblemRateTime(event.target.value) }} >
                  <TimeEst />
                </Form.Select>
              </Col>
              <Col sm={3} className='mb-3'>
                <Form.Label>Benefits Estimation</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Select value={item.problemRate.bnf} size='sm' disabled
                  onChange={(event) => { setProblemRateBnf(event.target.value) }} >
                  <BenefitEst />
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>

        </Modal.Body>
        {item.mts.author ? <ResolveMassage item={item} statusForm={statusForm} /> : ''}
      </Modal>
    </div>
  )
}

const ResolveMassage = ({ item, statusForm }) => {
  return (
    <>
      <hr className=''></hr>
      <Modal.Body>
        <h4 style={{ 'fontWeight': 'bold' }} className='mb-4'>Resolve from Admin</h4>
        <Row>
          <Col sm={3}>
            <p>Resolve by </p>
          </Col>
          <Col sm={9}>
            <p style={{ 'fontWeight': 'bold' }}>{item.mts.author}</p>
          </Col>
        </Row>
          <Row>
            <Col sm={3}>
              <Form.Label>Department</Form.Label>
            </Col>
            <Col sm={9}>
              <p style={{ 'fontWeight': 'bold' }}>{Departmant(item?.departmant)}</p>
            </Col>
          </Row>
        <Row>
          <Col sm={3}>
            <p>Resolve at</p>

          </Col>
          <Col sm={9}>
            <p style={{ 'fontWeight': 'bold' }}>{item.mts.restime.toDate().toLocaleString()}</p>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <p>Massage from Admin</p>
          </Col>
          <Col sm={9}>
            <p style={{ 'fontWeight': 'bold' }}>{item.mts.massage}</p>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <p>Status</p>
          </Col>
          <Col sm={9}>
            <p style={{ 'fontWeight': 'bold' }}>{statusForm(item.status)}</p>
          </Col>
        </Row>
      </Modal.Body>
    </>
  )
}

const Departmant = ( departmant ) => {
  switch (departmant) {
    case 'academic':
      return 'ฝ่ายวิชาการ'
    case 'building':
      return 'ฝ่ายอาคารสถานที่'
    case 'welfare':
      return 'ฝ่ายปกครอง'
    case 'finace':
      return 'ฝ่ายการเงิน'
    case 'sc':
      return 'Student Council'
    case 'director':
      return 'สำนักงานผู้อำนวยการ'
    default:
      return ''
  }
}

const ProgressLine = ({ item, status }) => {


  return (
    <>
      <Row className='mt-4'>
        <Col>
          <div className="timeline-steps aos-init aos-animate" data-aos="fade-up" >
            <div className="timeline-step">
              <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2003">
                <div className="inner-circle"></div>
                <p className="h6 mt-3 mb-1">Report Problem</p>
                <p className="h6 text-muted mb-0 mb-lg-0">{item.reportDate.toDate().toLocaleString()}</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2004">
                <div className="inner-circle"></div>
                <p className="h6 mt-3 mb-1">In Progress</p>
                <p className="h6  mb-1">{Departmant(item?.departmant)}</p>
                <p className="h6 text-muted mb-0 mb-lg-0">{!item.initprogress ? 'Waiting for Response' : (item.initprogress.author ? item.initprogress.restime.toDate().toLocaleString() : 'Waiting for Response')}</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2005">
                <div className="inner-circle"></div>
                <p className="h6 mt-3 mb-1">Success</p>
                <p className="h6 text-muted mb-0 mb-lg-0">{!item.initsuccess ? 'Waiting for Progress' : (item.initsuccess.author ? item.initsuccess.restime.toDate().toLocaleString() : 'Waiting for Progress')}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default ProblemCard