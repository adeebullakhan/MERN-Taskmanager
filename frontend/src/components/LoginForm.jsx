import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from '../redux/actions/authActions';
import Loader from './utils/Loader';

const LoginForm = ({ redirectUrl }) => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const authState = useSelector(state => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [authState, redirectUrl, isLoggedIn, navigate]);

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  }

  const fieldError = (field) => (
    <p className={`mt-2 text-sm text-red-500 ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <form className='w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg border'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center text-2xl font-semibold mb-6 text-gray-700'>Login</h2>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
              <Input 
                type="email" 
                name="email" 
                id="email" 
                value={formData.email} 
                placeholder="youremail@domain.com" 
                onChange={handleChange} 
                className="mt-2 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {fieldError("email")}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
              <Input 
                type="password" 
                name="password" 
                id="password" 
                value={formData.password} 
                placeholder="Your password.." 
                onChange={handleChange} 
                className="mt-2 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {fieldError("password")}
            </div>

            <button 
              className='w-full py-3 mt-4 bg-primary text-white rounded-md hover:bg-primary-dark transition'
              onClick={handleSubmit}
            >
              Submit
            </button>

            <div className='mt-4 text-center'>
              <Link to="/signup" className='text-blue-500 hover:underline'>Don't have an account? Sign up here</Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
