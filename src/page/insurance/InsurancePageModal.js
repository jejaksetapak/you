import React from 'react'
import { Form, Row, Col, Button, Modal, Image } from 'react-bootstrap';

const InsurancePageModal = ({
    handleShow,
    handleClose,
    loadImage,
    dataBrand,
    handleSubmitUpdate,
    setInsBrand,
    setInsCode,
    setInsPicName,
    setInsContactEmail,
    preview,
    fileErrorMax
}) => {


                                

    return (

        <Modal show={handleShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Form Data</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmitUpdate}>
                <Modal.Body>
                    <Row>
                        <Col lg={12} sm={12}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control type="text"
                                    defaultValue={dataBrand.insBrand}
                                    onChange={(e) => setInsBrand(e.target.value)}
                                    placeholder="Kode Brand" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} sm={12}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Code</Form.Label>
                                <Form.Control type="text"
                                    defaultValue={dataBrand.insCode}
                                    onChange={(e) => setInsCode(e.target.value)}
                                    placeholder="Label Brand" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} sm={12}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>PIC Name</Form.Label>
                                <Form.Control type="text"
                                    defaultValue={dataBrand.insPicName}
                                    onChange={(e) => setInsPicName(e.target.value)}
                                    placeholder="PIC Nam" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} sm={12}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Contact Email</Form.Label>
                                <Form.Control type="text"
                                    defaultValue={dataBrand.insContactEmail}
                                    onChange={(e) => setInsContactEmail(e.target.value)}
                                    placeholder="Contact Email" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} sm={12}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Image Brand</Form.Label>
                                <Form.Control type="file" size="sm" onChange={loadImage} />
                            </Form.Group>
                        </Col>
                        <Col lg={12} sm={12} className={fileErrorMax}><label className='text-red mb-3'>Size Image Terlalu Besar</label></Col>
                    </Row>
                    <Row>
                        <Col lg={12} sm={12}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                {preview ? (
                                    <figure>
                                        <Image className="image-preview" src={preview} alt="Preview Image" />
                                    </figure>
                                ) : (
                                    ""
                                )}
                            </Form.Group>
                        </Col>
                    </Row>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">
                        Simpan
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default InsurancePageModal;