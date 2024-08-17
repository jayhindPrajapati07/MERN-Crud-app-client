import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../adduser/add.css';
import toast from 'react-hot-toast';

const Edit = () => {
  const initialUser = {
    fname: "",
    lname: "",
    email: ""
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({});

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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

    setErrors(formErrors);
    return valid;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.put(`http://localhost:8000/api/update/${id}`, user);
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while updating the employee.");
      }
    }
  };

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Update Employee</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First name <span className='star'>*</span></label>
          <input 
            type="text" 
            value={user.fname} 
            onChange={inputChangeHandler} 
            id="fname" 
            name="fname" 
            autoComplete='off' 
            placeholder='First name' 
          />
          {errors.fname && <div className="error">{errors.fname}</div>}
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name <span className='star'>*</span></label>
          <input 
            type="text" 
            value={user.lname} 
            onChange={inputChangeHandler} 
            id="lname" 
            name="lname" 
            autoComplete='off' 
            placeholder='Last name' 
          />
          {errors.lname && <div className="error">{errors.lname}</div>}
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email <span className='star'>*</span></label>
          <input 
            type="email" 
            value={user.email} 
            onChange={inputChangeHandler} 
            id="email" 
            name="email" 
            autoComplete='off' 
            placeholder='Email' 
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="inputGroup">
          <button type="submit">UPDATE EMPLOYEE</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;