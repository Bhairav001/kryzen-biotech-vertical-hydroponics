import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
    });
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handlePhotoChange(e) {
        setPhoto(e.target.files[0]);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (formData.name === "" || formData.address === "" || formData.age === "") {
            toast.error("Please enter all details first !", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        try {
            const formDataWithPhoto = new FormData();
            formDataWithPhoto.append("name", formData.name);
            formDataWithPhoto.append("age", formData.age);
            formDataWithPhoto.append("address", formData.address);
            formDataWithPhoto.append("photo", photo);

            const response = await axios.post("http://localhost:8080/forms/submit", formDataWithPhoto, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log('backendData', response);
            toast.success("Form submitted successfully!", {
                position: toast.POSITION.TOP_RIGHT,
            });

            setTimeout(() => {
                navigate("/formPreview");
            }, 2000);
        } catch (error) {
            console.error('Error submitting form:', error.message);
            toast.error("Something went wrong!", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className="md:w-1/2 flex items-center justify-center mx-auto">
                <img src="https://wallpapercave.com/wp/wp2234604.jpg" alt="Registration" />
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
                        placeholder="Enter address"
                        value={formData.address}
                        name="address"
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Enter age"
                        value={formData.age}
                        name="age"
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
                    >
                        Submit
                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
};

export default Form;
