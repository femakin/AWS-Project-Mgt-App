"use client";

import React, {useState } from "react";
import { AiFillBackward } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function NewProject() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [attachment, setattachment] = useState("");
  const [file, setfile] = useState("");
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    projectStatus: [],
    gender: [],
    projectId: 0,
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

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: formData?.projectId,
      projectName: formData?.projectName,
      clientName: formData?.clientName,
      gender: formData?.gender[0],
      ClientImage: `${attachment}`,
      projectStatus: formData?.projectStatus[0],
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/addproject", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result === "Item added successfully") {
          setFormData({
            projectName: "",
            clientName: "",
            projectStatus: [],
            gender: [],
            projectId: 0,
            clientImage: null,
          });
          
          alert('Item added successfully')
          router.push("/");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleEdit = async (event) => {
    event.preventDefault();
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      id: formData?.projectId,
      projectName: formData?.projectName,
      clientName: formData?.clientName,
      gender: formData?.gender[0],
      ClientImage: `${attachment}`,
      projectStatus: formData?.projectStatus[0],
    });
  
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    fetch(`/editproject/${searchParams.get("q")}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
       
        if (result === "Item updated successfully") {
          console.log(result, "resulttttt");
          alert('Item updated successfully');
          router.push("/");
          setFormData({
            projectName: "",
            clientName: "",
            projectStatus: [],
            gender: [],
            projectId: 0,
            clientImage: null,
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

      <div className="flex justify-center items-center ">
        <div className="">
          <div className="flex flex-col justify-between p-8 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <div
                onClick={() => router.back()}
                className="flex items-center gap-x-3 cursor-pointer"
              >
                <AiFillBackward />
                <h2 className="text-lg font-medium text-blue-800 dark:text-white">
                  All projects
                </h2>
              </div>
            </div>

            <div className="mt-4">
              <section className="max-w-4xl mx-auto">
                <h1 className="text-lg text-center font-semibold text-blue-900 capitalize dark:text-white ">
                  New Project
                </h1>
                <p className="text-center  text-blue-800 mb-8">
                  Use the form below to add a new project
                </p>

                <form
                  className="max-w-lg mx-auto"
                  onSubmit={searchParams.get("q") ? handleEdit : handleSubmit}
                >
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="username"
                        className="text-gray-700 dark:text-gray-200"
                      >
                        Project Name
                      </label>
                      <input
                        required
                        id="username"
                        type="text"
                        name="projectName"
                        value={formData?.projectName}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="emailAddress"
                        className="text-gray-700 dark:text-gray-200"
                      >
                        Client Name
                      </label>
                      <input
                        required
                        id="clientName"
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="clientimage"
                        className="text-gray-700 dark:text-gray-200"
                      >
                        Client Logo
                      </label>
                      <input
                        required
                        id="clientimage"
                        type="file"
                        accept="image/*"
                        name="clientImage"
                        onChange={(e) => {
                          convert_to_base64(e.target.files[0]);
                        }}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="projectStatus"
                        className="block mb-2 text-gray-700 dark:text-gray-200"
                      >
                        Project Status:
                      </label>
                      <div className="flex flex-wrap items-center">
                        <label
                          htmlFor="pending"
                          className="text-gray-700 dark:text-gray-200 mr-4 mb-2 sm:mb-0 sm:flex-grow"
                        >
                          <input
                            type="checkbox"
                            id="pending"
                            name="projectStatus"
                            value="pending"
                            checked={formData.projectStatus.includes("pending")}
                            onChange={handleChange}
                            className="mr-2 text-blue-500"
                          />
                          Pending
                        </label>
                        <label
                          htmlFor="active"
                          className="text-gray-700 dark:text-gray-200 mr-4 mb-2 sm:mb-0 sm:flex-grow"
                        >
                          <input
                            type="checkbox"
                            id="active"
                            name="projectStatus"
                            value="active"
                            checked={formData.projectStatus.includes("active")}
                            onChange={handleChange}
                            className="mr-2 text-blue-500"
                          />
                          Active
                        </label>
                        <label
                          htmlFor="completed"
                          className="text-gray-700 dark:text-gray-200 sm:flex-grow"
                        >
                          <input
                            type="checkbox"
                            id="completed"
                            name="projectStatus"
                            value="completed"
                            checked={formData.projectStatus.includes(
                              "completed"
                            )}
                            onChange={handleChange}
                            className="mr-2 text-gray-700 dark:text-gray-200"
                          />
                          Completed
                        </label>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="gender"
                        className="block mb-2 text-gray-700 dark:text-gray-200"
                      >
                        Client Gender:
                      </label>
                      <div className="flex flex-wrap items-center">
                        <label
                          htmlFor="male"
                          className="text-gray-700 dark:text-gray-200 mr-4 mb-2 sm:mb-0 sm:flex-grow"
                        >
                          <input
                            type="checkbox"
                            id="male"
                            name="gender"
                            value="male"
                            checked={formData.gender.includes("male")}
                            onChange={handleChange}
                            className="mr-2 text-blue-500"
                          />
                          Male
                        </label>
                        <label
                          htmlFor="female"
                          className="text-gray-700 dark:text-gray-200 sm:flex-grow"
                        >
                          <input
                            type="checkbox"
                            id="female"
                            name="gender"
                            value="female"
                            checked={formData.gender.includes("female")}
                            onChange={handleChange}
                            className="mr-2 text-blue-500"
                          />
                          Female
                        </label>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="projectid"
                        className="text-gray-700 dark:text-gray-200"
                      >
                        Project ID
                      </label>
                      <input
                        required
                        id="projectid"
                        type="number"
                        name="projectId"
                        value={formData.projectId}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="flex items-center justify-center px-4 py-2 bg-blue-200 text-blue-800 rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-300"
                    >
                      {searchParams.get("q") ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProject;
