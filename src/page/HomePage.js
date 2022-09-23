import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap';
import './HomePage.css'
import Logo1 from "../assets/slide/slider1.jpg";
import Logo2 from "../assets/slide/slider2.jpg";
import Logo3 from "../assets/slide/slider3.jpg";
function HomePage() {
  const json = [{
    "id": 1,
    "title": "logo 1",
    "desc": "suka-suka saya",
    "img": Logo1
  },
  {
    "id": 2,
    "title": "logo 2",
    "desc": "suka-suka saya 2",
    "img": Logo2
  },
  {
    "id": 3,
    "title": "logo 3",
    "desc": "suka-suka saya 3",
    "img": Logo3
  }
  ];
  const [post] = useState(json);
  return (
    <Carousel fade className="image-slide-home">
      {
        post.map(res => (
          <Carousel.Item key={res.id}>
            <img
              className="d-block w-100 img-slide-home"
              src={res.img}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{res.title}</h3>
              <p>{res.desc}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}


    </Carousel>
  )
}

export default HomePage