import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import image1 from './images/image1.jpg'
import image2 from './images/image2.jpeg'
import image3 from './images/image3.jpg'

function CarouselP() {
  return (
    <div><Carousel data-bs-theme="dark">
    <Carousel.Item>
      <img
        style={{height:'50vh'}} // Still need to format image sizes
        className="Image 1"
        src= {image1}
        alt="First slide"
      />
      <Carousel.Caption>
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="Image 2"
        src={image2}
        alt="Second slide"
      />
      <Carousel.Caption>
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="Image 3"
        src={image3}
        alt="Third slide"
      />
      <Carousel.Caption>
        <h5>Third slide label</h5>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </div>
  )
}
export default CarouselP
