import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const FormPreview = () => {
  const [formData, setFormData] = useState([]);
  const pdfContainer = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/forms");
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error.message);
      }
    };

    fetchData();
  }, []);

  const generatePDF = async (index) => {
    try {
      // Wait for the content to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      const form = formData[index];
      const pdf = new jsPDF();
      const canvas = await html2canvas(pdfContainer.current);

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

      pdf.save('form-preview.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Form Preview</h1>
      {formData.map((form, index) => (
        <div key={index} className="mb-8 p-4 border border-gray-300 rounded">
          <p className="mb-2"><span className="font-bold">Name:</span> {form.name}</p>
          <p className="mb-2"><span className="font-bold">Age:</span> {form.age}</p>
          <p className="mb-2"><span className="font-bold">Address:</span> {form.address}</p>
          <img src={form.photo} alt="User" className="max-w-full" />
          <Link
            to="#"
            onClick={() => generatePDF(index)}
            className="block mt-4 text-blue-500 hover:underline"
          >
            Generate PDF
          </Link>
        </div>
      ))}

      <button
        onClick={navigateBack}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Go Back
      </button>

      <div ref={pdfContainer} className="hidden">
        {formData.map((form, index) => (
          <div key={index} className="mb-8 p-4 border border-gray-300 rounded">
            <p className="mb-2"><span className="font-bold">Name:</span> {form.name}</p>
            <p className="mb-2"><span className="font-bold">Age:</span> {form.age}</p>
            <p className="mb-2"><span className="font-bold">Address:</span> {form.address}</p>
            <img src={form.photo} alt="User" className="max-w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormPreview;
