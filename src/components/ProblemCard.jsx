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
  const handleShow = () => setShow(true);

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
      <Card className='mt-4 box' border={statusBorder(item.status)}>
        <Row>
          <Col sm={4} md={3} xl={3} >
            <img className='img-fluid rounded-start' src={(item.imagesURLs[0] !== undefined) ? item.imagesURLs[0] : 'https://www.teamgroup.co.th/wp-content/themes/consultix/images/no-image-found-360x260.png'} />
          </Col>
          <Col sm={4} md={6} xl={6} className='my-4'>
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
          <div className='text-center'>
            <Plot
              data={[
                {
                  type: 'scatterpolar',
                  r: [10 - item.problemRate.costs, 10 - item.problemRate.time, item.problemRate.bnf/ 6 * 9],
                  theta: ['Cost', 'Time', 'Benefits'],
                  fill: 'toself'
                },
              ]}
              layout={{
                polar: {
                  radialaxis: {
                    visible: true,
                    range: [0, 9]
                  }
                },
                showlegend: false, width: '3rem', height: 500, title: 'Estimated'
              }}
            />
          </div>
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

export default ProblemCard