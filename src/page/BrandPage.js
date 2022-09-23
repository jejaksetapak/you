import React, { useState, useEffect } from 'react'
import { Container,Row, Col, Table, Button } from 'react-bootstrap'
import { API_URL } from '../config/constants';
import swal from "sweetalert";
import axios from 'axios'
import BrandModalPage from './BrandModalPage';
function BrandPage() {
  const [EditShow, setEditShow] = useState(false);
  const handleClose = () => setEditShow(false);
  const [dataForm, setDataForm] = useState([]);
  const [posts, setPosts] = useState([]);
  const [id, setBrandId] = useState('');
  const [brandName, setBrandName] = useState('');
  const [brandLabel, setBrandLabel] = useState('');
  const [brandPicName, setBrandPicName] = useState('');
  const [brandPicTelp, setBrandPicTelp] = useState('');
  const editBrand = (data) => {
    setBrandId(data.brandId)
    setBrandName(data.brandName)
    setBrandLabel(data.brandLabel)
    setBrandPicName(data.brandPicName)
    setBrandPicTelp(data.brandPicTelp)
    setDataForm(data);
    setEditShow(true)
  }
  const list = () => {
    axios.get(
      
      API_URL + 'brand')
      .then(res => {
        setPosts(res.data);
      }).catch(e => {
      })
  }
  useEffect(() => {
    list()
  }, []);
  const deleted = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this user?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        axios.delete(API_URL + 'brand/'+id)
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
  const handleSubmitUpdate = (event) => {
    event.preventDefault();
     const formData={
          brandId:id,
          brandName: brandName,
          brandLabel: brandLabel,
          brandPicName: brandPicName,
          brandPicTelp: brandPicTelp
        };
    if(id >0){
      axios.put(API_URL+'brand',formData).then(
        res =>{
          setEditShow(false)
          list()
        }
      )
    }else{
      axios.post(API_URL+'brand',formData).then(
        res =>{
          setEditShow(false)
          list()
        }
      )
    }
  };
  return (
    <>
      <div className='selected-col'>
        <Container className="select-card-1">
          <Row>
            <Col lg={12} className="mb-3 mt-5 text-left">
              <Button variant="success" className="btn-left" onClick={() => editBrand(true)} >Tambah</Button>
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
                    {/* <th>Logo</th> */}
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
                        {/* <td>
                          <Image src={res.brandImage} />
                        </td> */}
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
      </div>
      <BrandModalPage
        handleShow={EditShow}
        handleClose={handleClose}
        dataBrand={dataForm}
        handleSubmitUpdate={handleSubmitUpdate}
        setBrandName={setBrandName}
        setBrandLabel={setBrandLabel}
        setBrandPicName={setBrandPicName}
        setBrandPicTelp={setBrandPicTelp}
      />
    </>
  )
}

export default BrandPage