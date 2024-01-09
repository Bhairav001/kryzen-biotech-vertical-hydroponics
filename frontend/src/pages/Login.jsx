import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
});
const navigate = useNavigate()
function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
}

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.email == "" || formData.pass == "") {
        toast.error("Please enter all details first !", {
            position: toast.POSITION.TOP_RIGHT,
        });
        return
    }
    try {
        const response = await fetch("http://localhost:8080/users/login", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res=>res.json())
        .then(res=>{
            console.log("res",res)
            if(res.msg=="user Logggin"){
              localStorage.setItem("token",res.token)
              toast.success("Login Sucessfully !", {
                position: toast.POSITION.TOP_RIGHT,
               });
             setTimeout(() => {  
                navigate("/")
             }, 2000)
            }else{
              // console.error('Error submitting form:', error.message);
              toast.error("Something went wrong!.", {
                  position: toast.POSITION.TOP_RIGHT,
              });
            }
        })
        .catch(err=>console.log(err))
       

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
            <img src="https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D" alt="Registration" />
        </div>
        <div className="md:w-1/2 container mx-auto p-4">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
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
                    Login
                </button>
                <ToastContainer />
            </form>
        </div>
    </div>
  )
}

export default Login