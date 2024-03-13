import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
} from 'mdb-react-ui-kit';

export default function Saved() {
    return (
        // Removed the fluid and w-100 classes and applied a custom class to handle full width
        <MDBContainer className="custom-container">
          {/* Applied inline styles directly to ensure full width and remove any default margins/paddings */}
          <div className="bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px', width: '100vw', margin: '0', padding: '0'}}></div>
    
          {/* Adjusted the styling of the card to ensure it aligns with the adjustments made to the container/image */}
          <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 text-center'>
    
              <h2 className="fw-bold mb-5">Sign up now</h2>
    
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text'/>
                </MDBCol>
    
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text'/> {/* Corrected id to form2 for last name */}
                </MDBCol>
              </MDBRow>
    
              <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email'/> {/* Adjusted id to form3 for email */}
              <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password'/> {/* Adjusted id to form4 for password */}
    
              <MDBBtn className='w-100 mb-4' size='md'>sign up</MDBBtn>
    
              <div className="text-center">
                <p>Forgot Password?</p>
              </div>
    
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      );
}


