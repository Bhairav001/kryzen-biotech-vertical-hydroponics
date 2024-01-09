import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PDFDocument } from 'pdf-lib';

const FormPreview = () => {
  const [formData, setFormData] = useState([]);
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

  const generatePDF = async (form) => {
    console.log("formpdf",form)
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();

      const formText = `Name: ${form.name}\nAge: ${form.age}\nAddress: ${form.address}`;

      page.drawText(formText, {
        x: 50,
        y: height - 200,
        font: await pdfDoc.embedFont(PDFDocument.Font.Helvetica),
        fontSize: 12,
        color: await PDFDocument.rgb(0, 0, 0),
      });

      if (form.photo) {
        const imageBytes = await fetch(form.photo).then(res => res.arrayBuffer());
        const image = await pdfDoc.embedPng(imageBytes);
        const imageDims = image.scale(0.5);
        page.drawImage(image, {
          x: 50,
          y: height - 400,
          width: imageDims.width,
          height: imageDims.height,
        });
      }

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'form-preview.pdf';
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>Form Preview</h1>
      {formData.map((form, index) => (
        <div key={index}>
          <p>Name: {form.name}</p>
          <p>Age: {form.age}</p>
          <p>Address: {form.address}</p>
          <img src={form.photo} alt="User" style={{ maxWidth: '300px' }} />
          <button onClick={() => generatePDF(form)}>Generate PDF</button>
        </div>
      ))}

      <button onClick={navigateBack}>Go Back</button>
    </div>
  );
};

export default FormPreview;
