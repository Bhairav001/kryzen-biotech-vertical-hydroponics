import React, { useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pass: '',
    });
    const navigate = useNavigate()
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }


    console.log("form", formData.name)
    async function handleSubmit(e) {
        e.preventDefault();

        if (formData.name == "" || formData.email == "" || formData.pass == "") {
            toast.error("Please enter all details first !", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return
        }
        try {
            const response = await fetch("http://localhost:8080/users/register", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-type": "application/json"
                }
            });
            console.log(response)
            console.log('backendData', response);
            toast.success("Register Sucessfully !", {
                position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
                navigate("/login")
            }, 2000)

        } catch (error) {
            console.error('Error submitting form:', error.message);
            toast.error("Something went wrong!.", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }

    }
    return (
        <div className='flex flex-col md:flex-row'>
        <div className="md:w-1/2 flex items-center justify-center mx-auto">
            <img src="https://media.istockphoto.com/id/1463013729/photo/online-registration-form-for-modish-form-filling.webp?b=1&s=170667a&w=0&k=20&c=iUOC7YLenExVDT9pfUtJyyIS-dlJvOPyJq1USG4lv5I=" alt="Registration" />
        </div>
        <div className="md:w-1/2 container mx-auto p-4">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
                <input
                    type="text"
                    placeholder="Enter name"
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Enter email"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={formData.pass}
                    name="pass"
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
                >
                    Signup
                </button>
                <ToastContainer />
            </form>
        </div>
    </div>
    
    );
};

export default Signup;
