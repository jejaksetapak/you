import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table, Image } from 'react-bootstrap'
import swal from "sweetalert";
import axios from 'axios'
import './InsurancePage.css';
import { API_URL } from '../../config/constants';
import InsurancePageModal from './InsurancePageModal';
function InsurancePage() {
    const [EditShow, setEditShow] = useState(false);
    const handleClose = () => setEditShow(false);
    const [dataForm, setDataForm] = useState([]);
    const [posts, setPosts] = useState([]);
    const [insId, setInsId] = useState('');
    const [insBrand, setInsBrand] = useState('');
    const [insCode, setInsCode] = useState('');
    const [insPicName, setInsPicName] = useState('');
    const [insContactEmail, setInsContactEmail] = useState('');
    const [file, setFile] = useState("");
    const [fileSIze, setFileSIze] = useState("");
    const [fileErrorMax, setFileErrorMax] = useState('');
    const [preview, setPreview] = useState("");
    const editBrand = (data) => {
        setInsId(data.insId)
        setInsBrand(data.insBrand)
        setInsCode(data.insCode)
        setInsPicName(data.insPicName)
        setInsContactEmail(data.insContactEmail)
        setPreview(data.insImage)
        setFile(data.insImage)
        setFileErrorMax('hidden-show')
        setFileSIze(0)
        setDataForm(data);
        setEditShow(true)
    }
    const deleted = (id) => {
        swal({
            title: "Are you sure?",
            text: "You want to delete this user?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    axios.get(API_URL + 'insurance/delete/' + id)
                        .then(res => {
                            list()
                            swal({
                                title: "Done!",
                                text: "brand is deleted",
                                icon: "success",
                                timer: 2000,
                                button: false
                            })
                        });
                }
            });

    };
    const list = () => {
        axios.get(API_URL + 'insurance')
            .then(res => {
                setPosts(res.data);
            }).catch(e => {
            })
    }
    useEffect(() => {
        list()
    }, []);
    const handleSubmitUpdate = (event) => {
        event.preventDefault();
        // const formData=[];

        const formData = {
            insId: insId,
            insBrand: insBrand,
            insCode: insCode,
            insPicName: insPicName,
            insContactEmail: insContactEmail,
            insImage: file
        };
        if (fileSIze > 72712) {
            swal({
                title: "Error!",
                text: "Size Image Terlalu Besar",
                icon: "error",
                timer: 2000,
                button: false
            })
        } else {

            axios.post(API_URL + 'insurance', formData).then(
                res => {
                    console.log('xaaaaa')
                    if (res.data.status === true) {
                        setEditShow(false)
                        list()
                    } else {
                        swal({
                            title: "Error!",
                            text: res.data.messages,
                            icon: "error",
                            timer: 2000,
                            button: false
                        })
                    }
                }
            ).catch(function (error) {
                swal({
                    title: "Error!",
                    text: error.response.data.messages[0],
                    icon: "error",
                    timer: 2000,
                    button: false
                })
            })

        }

    };
    const getBase64 = file => {
        return new Promise(resolve => {
            // let fileInfo;
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                // console.log(baseURL);
                resolve(baseURL);
            };
        });
    };
    const loadImage = (e) => {
        const image = e.target.files[0];
        setFileSIze(image.size);
        if (image.size > 72712) {
            // console.log(image);
            validation('true');
        } else {
            validation('false')
            getBase64(image)
                .then(result => {
                    setFile(result);
                })
                .catch(err => {
                    console.log(err);
                });
            setPreview(URL.createObjectURL(image));
        }

    };
    const validation = e => {
        if (e !== 'false') {
            setFileErrorMax('active');
        } else {
            setFileErrorMax('hidden-show');
        }

    }
    return (
        <>
            <div className='selected-col'>
                <Container className="select-card-1">
                    <Row>
                        <Col lg={12} className="mb-3 mt-5 text-left">
                            <Button variant="success" className="btn-left" onClick={() => editBrand(true)}>Tambah</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Brand</th>
                                        <th>Code</th>
                                        <th>Logo</th>
                                        <th>PIC Nama</th>
                                        <th>Contact Email</th>
                                        <th>#</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        posts.map((res, index) => (
                                            <tr key={res.insId}>
                                                <td>{index + 1}</td>
                                                <td>{res.insBrand}</td>
                                                <td>{res.insCode}</td>
                                                <td>
                                                    <Image className="image-preview-grid" src={res.insImage} />
                                                </td>
                                                <td>{res.insPicName}</td>
                                                <td>{res.insContactEmail}</td>
                                                <td><Button variant='success' onClick={() => editBrand(res)}>Edit</Button></td>
                                                <td><Button variant='danger' onClick={() => deleted(res.insId)}>Hapus</Button></td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
                <InsurancePageModal
                    handleShow={EditShow}
                    handleClose={handleClose}
                    loadImage={loadImage}
                    dataBrand={dataForm}
                    handleSubmitUpdate={handleSubmitUpdate}
                    setInsBrand={setInsBrand}
                    setInsCode={setInsCode}
                    setInsPicName={setInsPicName}
                    setInsContactEmail={setInsContactEmail}
                    setFile={setFile}
                    fileErrorMax={fileErrorMax}
                    preview={preview}
                />
            </div>
        </>
    )
}

export default InsurancePage