import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Textbox(props) {
    const { videoTitle, videoDescription} = props;
     return (
        <Container className='text-start'>
            <Row>
                <h1>{videoTitle}</h1>
            </Row>
            <Row>
                <p>{videoDescription}</p>
            </Row>
        </Container>
     );
    }

export default Textbox;