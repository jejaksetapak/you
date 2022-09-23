import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table, Image } from 'react-bootstrap'
import swal from "sweetalert";
import axios from 'axios'
import './BrandForm.css';
import { API_URL } from '../../config/constants';
import BrandFormModal from './BrandFormModal';
function BrandFormList() {
    const [EditShow, setEditShow] = useState(false);
    const handleClose = () => setEditShow(false);
    const [dataForm, setDataForm] = useState([]);
    const [posts, setPosts] = useState([]);
    const [id, setBrandId] = useState('');
    const [brandName, setBrandName] = useState('');
    const [brandLabel, setBrandLabel] = useState('');
    const [brandPicName, setBrandPicName] = useState('');
    const [brandPicTelp, setBrandPicTelp] = useState('');
    const [file, setFile] = useState("");
    const [fileSIze, setFileSIze] = useState("");
    const [fileErrorMax, setFileErrorMax] = useState('');
    const [preview, setPreview] = useState("");
    const editBrand = (data) => {
        setBrandId(data.brandId)
        setBrandName(data.brandName)
        setBrandLabel(data.brandLabel)
        setBrandPicName(data.brandPicName)
        setBrandPicTelp(data.brandPicTelp)
        setPreview(data.brandImage)
        setFile(data.brandImage)
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
                    axios.delete(API_URL + 'brand/' + id)
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
        axios.get(API_URL + 'brand')
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
            brandId: id,
            brandName: brandName,
            brandLabel: brandLabel,
            brandPicName: brandPicName,
            brandPicTelp: brandPicTelp,
            brandImage: file
        };
        if (fileSIze > 72712){
            swal({
                title: "Error!",
                text: "Size Image Terlalu Besar",
                icon: "error",
                timer: 2000,
                button: false
            })
        }else{
            if (id > 0) {
                axios.put(API_URL + 'brand', formData).then(
                    res => {
                        console.log(res)
                        setEditShow(false)
                        list()
                    }
                )
            } else {
                axios.post(API_URL + 'brand', formData).then(
                    res => {
                        setEditShow(false)
                        list()
                    }
                )
            }
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
        if (e != 'false') {
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
                                        <th>Kode</th>
                                        <th>Label</th>
                                        <th>Logo</th>
                                        <th>PIC Nama</th>
                                        <th>PIC Telp</th>
                                        <th>#</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        posts.map((res, index) => (
                                            <tr key={res.brandId}>
                                                <td>{index + 1}</td>
                                                <td>{res.brandName}</td>
                                                <td>{res.brandLabel}</td>
                                                <td>
                                                    <Image className="image-preview-grid" src={res.brandImage} />
                                                </td>
                                                <td>{res.brandPicName}</td>
                                                <td>{res.brandPicTelp}</td>
                                                <td><Button variant='success' onClick={() => editBrand(res)}>Edit</Button></td>
                                                <td><Button variant='danger' onClick={() => deleted(res.brandId)}>Hapus</Button></td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
                <BrandFormModal
                    handleShow={EditShow}
                    handleClose={handleClose}
                    loadImage={loadImage}
                    dataBrand={dataForm}
                    handleSubmitUpdate={handleSubmitUpdate}
                    setBrandName={setBrandName}
                    setBrandLabel={setBrandLabel}
                    setBrandPicName={setBrandPicName}
                    setBrandPicTelp={setBrandPicTelp}
                    setFile={setFile}
                    fileErrorMax={fileErrorMax}
                    preview={preview}
                />
            </div>
        </>
    )
}

export default BrandFormList