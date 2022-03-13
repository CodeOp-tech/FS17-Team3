import React, { useState } from 'react';

const blank = {
    username: '',
    password: ''
};

const UserLogin = (props) => {
    const [formData, setFormData] = useState(blank);

    function handleSubmit(event) {
      event.preventDefault();
      props.userLogInCb(formData.username, formData.password);
      if (props.loginError) {console.log(props.loginError)} // add MUI alerts here
      setFormData(blank);
    }
  
    function handleChange(event) {
      let { name, value } = event.target;
      setFormData(data => ({
        ...data,
        [name]: value
      }));
    }
  
    return (
     <div className="UserLogin row">
     <div className="col-4 offset-4"></div>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
            <h2>Log In</h2>
          </div>
            <label htmlFor="username"
              className="form-label">Username</label>
              <input
              type="text"
              name="username"
              required
              value={formData.username}
              className="form-control"
              onChange={handleChange}
              />
            <div className="form-group">
              <label htmlFor="password"
               className="form-label">Password</label>
              <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              />
            </div>
  
            <div>
              <button type="submit" className="btn btn-primary">Log In</button>
            </div>
        </form>
     </div>
  )
}

export default UserLogin;