import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import image1 from './images/image1.jpg'
import image2 from './images/image2.jpeg'
import image3 from './images/image3.jpg'

function CarouselP() {
  return (
    <div className='w-100'>
      <Carousel variant="dark" className='w-100'>
        <Carousel.Item>
          <img
            style={{height:'50vh', objectFit: 'cover'}}
            className="d-block w-100"
            src={image1}
            alt="Bringing People Together"
          />
          <Carousel.Caption>
            <h5>Bringing People Together</h5>
            <p>Join our mission to combat food insecurity by sharing surplus fruits and vegetables within your community.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{height:'50vh', objectFit: 'cover'}}
            className="d-block w-100"
            src={image2}
            alt="Share Your Surplus"
          />
          <Carousel.Caption>
            <h5>Share Your Surplus</h5>
            <p>Got extra produce? List your food donations easily and support local pantries in need.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{height:'50vh', objectFit: 'cover'}}
            className="d-block w-100"
            src={image3}
            alt="Access Fresh Produce"
          />
          <Carousel.Caption>
            <h5>Access Fresh Produce</h5>
            <p>In need of fresh fruits and vegetables? Discover how you can connect with local donors and bring nutritious food to your table or pantry.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default CarouselP
