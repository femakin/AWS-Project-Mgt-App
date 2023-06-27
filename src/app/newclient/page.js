"use client";

import React, {useState } from "react";
import { AiFillBackward } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ClientForm from "../components/ClientForm";

function NewClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [attachment, setattachment] = useState("");
  const [add, setAdd] = useState(false);
  const [file, setfile] = useState("");
  const [added, setAdded] = useState(false)

  const [formData, setFormData] = useState({
    clientName: "",
    gender: [],
    clientId: 0,
    clientImage: null,
  });

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
    var myHeaders = new Headers(); myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: formData?.clientId,
      clientName: formData?.clientName,
      gender: formData?.gender[0],
      ClientImage: `${attachment}`,
    });

    var requestOptions = { method: "PUT", headers: myHeaders, body: raw,redirect: "follow",};

    fetch("/addclient", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setAdd(false)
        console.log(result, 'tttttt')
        if (result === "Client added successfully") {
          console.log(result)
          
          setFormData({
            clientName: "",
            gender: [],
            clientId: 0,
            clientImage: null,
          });
          alert('Client added successfully, Please Proceed to add your project')
          router.push("/addproject");

        }
      })
      .catch((error) => console.log("error", error));
  };



  const handleEdit = async (event) => {
    event.preventDefault();

    setAdd(true)
    var myHeaders = new Headers(); myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: formData?.clientId,
      clientName: formData?.clientName,
      gender: formData?.gender[0],
      ClientImage: `${attachment}`,
    });

    var requestOptions = { method: "PUT", headers: myHeaders, body: raw,redirect: "follow",};

    fetch(`/editclient/${searchParams.get("cid")}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setAdd(false)
        console.log(result, 'tttttt')
        if (result === "Item updated successfully") {
          console.log(result)
          
          setFormData({
            clientName: "",
            gender: [],
            clientId: 0,
            clientImage: null,
          });
          alert('Client edited successfully, Please Proceed to edit your project also.')
          router.push("/addproject");
          console.log(searchParams.get("q"), 'searchParams.get("q")')
        
          localStorage.setItem('id', `${searchParams.get("q")}`)
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
      <ClientForm searchParams={searchParams} handleEdit={handleEdit} Edit={add}  handleChange={handleChange} handleSubmit={handleSubmit} Add={add} formData={formData} convertToBase64={convert_to_base64} Router={()=> router.back()} />
    </>
  );
}

export default NewClient;
