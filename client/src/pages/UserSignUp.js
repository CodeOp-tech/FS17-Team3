import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import SubmitModal from '../components/Modal';

const blank = {
    email: '',
    username: '',
    password: ''
};

function UserSignUp(props) {
    const [formData, setFormData] = useState(blank);
    const [modalShow, setModalShow] = useState(false);
    const modalInfo = {
      title: 'Account created successfully!',
      closetext: 'Close window',
      backtext: 'Log In',
      backpath: '/user-login'
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      props.addUserCb(formData);
      setModalShow(true);
      setFormData(blank);
      // add MUI alerts here depending on success or not
    }
  
    function handleChange(event) {
      let { name, value } = event.target;
      setFormData(data => ({
        ...data,
        [name]: value
      }));
    }
  
    return (
     <div className="container d-flex justify-content-center">
        <Form className="mt-3 user-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <h2>Create Account</h2>
          </div>
            <div className="mb-3">
              <label htmlFor="email"
               className="form-label">Email address</label>
              <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              />
            </div>
            <div className="mb-3">
            <label htmlFor="username"
             className="form-label">Username</label>
              <input
              type="text"
              name="username"
              value={formData.username}
              className="form-control"
              onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password"
               className="form-label">Password</label>
              <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              />
            </div>
            <div>
              <button type="submit"
               className="btn btn-primary">Sign Up</button>
            </div>
        </Form>

        <SubmitModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                modalInfo={modalInfo}/>
      </div>
    );
}

export default UserSignUp;