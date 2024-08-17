import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './add.css';
import toast from 'react-hot-toast';

const Add = () => {
  const initialUser = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    // First Name validation
    if (!user.fname.trim()) {
      formErrors.fname = "First name is required.";
      valid = false;
    }

    // Last Name validation
    if (!user.lname.trim()) {
      formErrors.lname = "Last name is required.";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email.trim()) {
      formErrors.email = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(user.email)) {
      formErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!user.password) {
      formErrors.password = "Password is required.";
      valid = false;
    } else if (!passwordRegex.test(user.password)) {
      formErrors.password = "Password must be at least 8 characters long, include one uppercase letter, and one special character.";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8000/api/create", user);
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Add New Employee</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First name <span className='star'>*</span></label>
          <input 
            type="text" 
            onChange={inputHandler} 
            id="fname" 
            name="fname" 
            autoComplete='off' 
            placeholder='First name' 
            value={user.fname}
          />
          {errors.fname && <div className="error">{errors.fname}</div>}
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name <span className='star'>*</span></label>
          <input 
            type="text" 
            onChange={inputHandler} 
            id="lname" 
            name="lname" 
            autoComplete='off' 
            placeholder='Last name' 
            value={user.lname}
          />
          {errors.lname && <div className="error">{errors.lname}</div>}
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email <span className='star'>*</span></label>
          <input 
            type="email" 
            onChange={inputHandler} 
            id="email" 
            name="email" 
            autoComplete='off' 
            placeholder='Email' 
            value={user.email}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password <span className='star'>*</span></label>
          <input 
            type="password" 
            onChange={inputHandler} 
            id="password" 
            name="password" 
            autoComplete='off' 
            placeholder='Password' 
            value={user.password}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div className="inputGroup">
          <button type="submit">ADD EMPLOYEE</button>
        </div>
      </form>
    </div>
  );
};

export default Add;