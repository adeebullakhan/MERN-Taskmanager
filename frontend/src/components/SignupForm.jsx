import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateManyFields from '../validations';
import Input from './utils/Input';
import Loader from './utils/Loader';

const SignupForm = () => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };
    fetchData(config).then(() => {
      navigate("/login");
    });
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
            <h2 className='text-center text-2xl font-semibold mb-6 text-gray-700'>Sign up</h2>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
              <Input 
                type="text" 
                name="name" 
                id="name" 
                value={formData.name} 
                placeholder="Your name" 
                onChange={handleChange} 
                className="mt-2 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {fieldError("name")}
            </div>

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
              <Link to="/login" className='text-blue-500 hover:underline'>Already have an account? Login here</Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default SignupForm;
