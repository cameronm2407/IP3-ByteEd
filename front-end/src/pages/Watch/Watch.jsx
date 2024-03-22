
import React, { useEffect, useLayoutEffect, useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Textbox from './components/Textbox';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';



export default function Watch() {

    const token = localStorage.getItem("token");
    const heightPlayer = window.innerHeight * 0.75;
    let { videoId } = useParams();
    const videoCall = "http://localhost:443/api/content/videos?id=" + videoId; 
    const [video, setVideo] = useState([]);

    useEffect(() => {
      fetch(videoCall, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setVideo(data.videos[0]);
        })
        .catch((error) => console.log(error));
    }, []);

    if (video.length === 0) {
      return ( 
        <div class="card text-center">
          <h1 class="card-title">
            Video not Found
          </h1>
        </div>)
    }
    return (

      <Container fluid className='text-center h-100 w-100' style={{position: "relative"}}>
        <Row className='bg-dark h-25'>
          <VideoPlayer videoLink={video.url}/>
        </Row>

        <Row fluid>
          <Col className='bg-info col-8'>

          </Col>
          <Col className='col-4'>
            <Textbox videoTitle={video.title} videoDescription={video.description}/>
          </Col>
        </Row>
      </Container>
    );
    
   };





