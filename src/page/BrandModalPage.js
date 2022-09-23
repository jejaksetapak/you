import React from 'react'
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

const BrandModalPage = ({
    handleShow,
    handleClose,
    dataBrand,
    handleSubmitUpdate,
    setBrandName,
    setBrandLabel,
    setBrandPicName,
    setBrandPicTelp
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
                                <Form.Label>Kode</Form.Label>
                                <Form.Control type="text"
                                    defaultValue={dataBrand.brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                    placeholder="Kode Brand" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} sm={12}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Label</Form.Label>
                                <Form.Control type="text"
                                    defaultValue={dataBrand.brandLabel}
                                    onChange={(e) => setBrandLabel(e.target.value)}
                                    placeholder="Label Brand" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} sm={12}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>PIC Name</Form.Label>
                                <Form.Control type="text"
                                    defaultValue={dataBrand.brandPicName}
                                    onChange={(e) => setBrandPicName(e.target.value)}
                                    placeholder="PIC Nam" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} sm={12}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>PIC Telp</Form.Label>
                                <Form.Control type="text"
                                    defaultValue={dataBrand.brandPicTelp}
                                    onChange={(e) => setBrandPicTelp(e.target.value)}
                                    placeholder="PIC Telp" />
                            </Form.Group>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col lg={12} sm={12}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Image Brand</Form.Label>
                                <Form.Control type="file" size="sm" />
                            </Form.Group>
                        </Col>
                    </Row> */}



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

export default BrandModalPage