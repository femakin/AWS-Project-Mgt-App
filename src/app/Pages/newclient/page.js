"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ClientForm from "../../components/Forms/ClientForm";
import { handleClientSubmit, handleClientEdit } from "../../util/Add&editClientfunctions";

function NewClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [attachment, setattachment] = useState("");
  const [add, setAdd] = useState(false);
  const [file, setfile] = useState("");


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

  return (
    <>
      <div className="text-center mb-8 bg-[#DBEAFE] py-4">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Project Management System
        </h1>
      </div>
      <ClientForm
        searchParams={searchParams}
        handleEdit={() => handleClientEdit({event, setFormData, formData, setAdd, attachment, router, searchParams})}
        Edit={add}
        handleChange={handleChange}
        // handleSubmit={handleSubmit}
        handleSubmit={(event) => handleClientSubmit({ event, setFormData, formData, setAdd, attachment, router })}

        Add={add}
        formData={formData}
        convertToBase64={convert_to_base64}
        Router={() => router.back()}
      />
    </>
  );
}

export default NewClient;
