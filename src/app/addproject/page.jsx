"use client";

import React, {useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ProjectForm from "../components/ProjectForm";


function Index() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [attachment, setattachment] = useState("");
    const [add, setAdd] = useState(false);
    const [localdata, setLocalData]  = useState(null)
    const [edit, setEdit] = useState(false);
    const [file, setfile] = useState("");
    const [formData, setFormData] = useState({
      projectName: "",
      projectStatus: [],
      projectId: 0,
    });



    useEffect(() => {

      console.log( localStorage.getItem('id'))
      setLocalData(localStorage.getItem('id'))
  

    }, [])
    


  
    const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
  
      if (type === "checkbox") {
        const updatedValues = [...formData[name]];
        if (checked) {
          updatedValues.push(value);
        } else {
          const index = updatedValues.indexOf(value);
          if (index > -1) {
            updatedValues.splice(index, 1);
          }
        }
        setFormData((prevData) => ({ ...prevData, [name]: updatedValues }));
      } else if (type === "file") {
        const file = event.target.files[0];
        setFormData((prevData) => ({ ...prevData, [name]: file }));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
    };
  
    const convert_to_base64 = async (file) => {
      setfile(file);
      const file_reader = new FileReader();
      file_reader.readAsDataURL(file);
      file_reader.onload = () => {
        setattachment(file_reader?.result?.split(",")[1]);
      };
    };
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setAdd(true)


      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "id": "2",
        "projectName": "projectk",
        "projectStatus": "completed"
      });

      var raw = JSON.stringify({
        id: formData?.projectId,
        projectName: formData?.projectName,
        projectStatus: formData?.projectStatus[0],
      });
      
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("/additem", requestOptions)
        .then(response => response.text())
        .then((result) => {
          setAdd(false)
          console.log(result, 'result')
          if (result === "Item added successfully") {
            console.log(result, 'result')
            setFormData({
              projectName: "",
              projectStatus: [],
              projectId: 0,
      
            });
            
            alert('Item added successfully')
            router.push("/");
          }
        })
        .catch(error => console.log('error', error));
    };
  
    const handleEdit = async (event) => {
      event.preventDefault();
      console.log('edit, project')
      setEdit(true)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
    
      var raw = JSON.stringify({
        id: localStorage.getItem('id'),
        projectName: formData?.projectName,
        projectStatus: formData?.projectStatus[0],
      });
    
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
    
      fetch(`/editproject`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setEdit(false)
          console.log(result, 'ressss')
       
          if (result === "Item added successfully") {
            localStorage.clear()
            console.log(result, "resulttttt");
            alert('Project updated successfully');
            router?.push("/");
            setFormData({
              projectName: "",
              clientName: "",
              projectStatus: [],
        
            });
          }
        })
        .catch((error) => console.log("error", error));
    };

    return (
        <>
          <div className="text-center mb-8 bg-[#DBEAFE] py-4">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">
              Project Management System
            </h1>
          </div>
    
        <ProjectForm id_={localdata} searchParams={searchParams} handleEdit={handleEdit}  handleChange={handleChange} handleSubmit={handleSubmit} Add={add} formData={formData} convertToBase64={convert_to_base64} Edit={edit}   Router={()=> router.back()}  />
        </>
      );
}

export default Index