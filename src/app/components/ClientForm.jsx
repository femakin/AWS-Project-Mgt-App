import React from "react";
import { AiFillBackward } from "react-icons/ai";

function ClientForm({ handleSubmit, handleChange, formData, convertToBase64, isEdit,handleEdit, isSubmitting, Add, Router , Edit, searchParams, Added }) {
  return (
    <div className="flex justify-center items-center ">
      <div className="">
        <div className="flex flex-col justify-between p-8 bg-white rounded-md shadow-md">
          <div className="flex justify-between items-center">
            <div onClick={Router} className="flex items-center gap-x-3 cursor-pointer">
              <AiFillBackward />
              <h2 className="text-lg font-medium text-blue-800 dark:text-white">All projects</h2>
            </div>
          </div>

          <div className="mt-4">
            <section className="max-w-4xl mx-auto">
              <h1 className="text-lg text-center font-semibold text-blue-900 capitalize dark:text-white">New Client</h1>
              <p className="text-center text-blue-800 mb-8">Use the form below to add a new client</p>

              <form className="max-w-lg mx-auto" onSubmit={searchParams.get("q") ? handleEdit : handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="emailAddress" className="text-gray-700 dark:text-gray-200">Client Name</label>
                    <input required id="clientName" type="text" name="clientName" value={formData.clientName} onChange={handleChange} 
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 
                    rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                  </div>

                  <div>
                    <label htmlFor="clientimage" className="text-gray-700 dark:text-gray-200">Client Logo</label>
                    <input required id="clientimage" type="file" accept="image/*" name="clientImage" 
                     onChange={(e) => {
                        convertToBase64(e.target.files[0]);
                      }} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 
                    rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 
                    focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="gender" className="block mb-2 text-gray-700 dark:text-gray-200">Client Gender:</label>
                    <div className="flex flex-wrap items-center">
                      <label htmlFor="male" className="text-gray-700 dark:text-gray-200 mr-4 mb-2 sm:mb-0 sm:flex-grow">
                        <input type="checkbox" id="male" name="gender" value="male" checked={formData.gender.includes("male")} onChange={handleChange} className="mr-2 text-blue-500" /> Male
                      </label>
                      <label htmlFor="female" className="text-gray-700 dark:text-gray-200 sm:flex-grow">
                        <input type="checkbox" id="female" name="gender" value="female" checked={formData.gender.includes("female")} onChange={handleChange} className="mr-2 text-blue-500" /> Female
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="clientId" className="text-gray-700 dark:text-gray-200">Client ID</label>
                    <input required id="clientId" type="number" name="clientId" value={searchParams.get("q") ? Number(searchParams.get("cid")) : formData.clientId    } 
                    onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 
                    rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button type="submit" className="flex items-center justify-center px-4 py-2 bg-blue-200 text-blue-800 
                  rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-300">
                    {/* {`${Add ? 'loading...' : 'Save'}`} */}
                    {searchParams.get("q") ? `${ Edit ? 'loading...' : 'Update'  }` : `${ Add ? 'loading...' : 'Save'  }`}

                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientForm;
