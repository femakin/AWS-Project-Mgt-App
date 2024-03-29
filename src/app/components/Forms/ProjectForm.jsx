import React from 'react';
import { AiFillBackward } from "react-icons/ai";
const ProjectForm = ({ handleSubmit, handleChange, formData,  handleEdit, Add, Edit, Router, id_ }) => {
    return (
        <div className="flex justify-center items-center ">
        <div className="">
          <div className="flex flex-col justify-between p-8 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <div
                onClick={Router} className="flex items-center gap-x-3 cursor-pointer"
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
                <p className="text-center  text-blue-800 mb-8">Use the form below to add a new project</p>
                <form
                  className="max-w-lg mx-auto" onSubmit={localStorage.getItem('id') ? handleEdit : handleSubmit}
                >
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                     <div>
                      <label
                        htmlFor="username" className="text-gray-700 dark:text-gray-200"
                      >
                        Project Name
                      </label>
                      <input required
                        id="username" type="text"  name="projectName" value={formData?.projectName} onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                        focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      />
                    </div> 

                    <div className="mb-4">
                      <label
                        htmlFor="projectStatus" className="block mb-2 text-gray-700 dark:text-gray-200"
                      >
                        Project Status:
                      </label>
                      <div className="flex flex-wrap items-center">
                        <label
                          htmlFor="pending" className="text-gray-700 dark:text-gray-200 mr-4 mb-2 sm:mb-0 sm:flex-grow"
                        >
                          <input
                            type="checkbox" id="pending" name="projectStatus" value="pending" checked={formData.projectStatus.includes("pending")} onChange={handleChange}  className="mr-2 text-blue-500"
                          />
                          Pending
                        </label>
                        <label
                          htmlFor="active" className="text-gray-700 dark:text-gray-200 mr-4 mb-2 sm:mb-0 sm:flex-grow"
                        >
                          <input type="checkbox" id="active" name="projectStatus" value="active" checked={formData.projectStatus.includes("active")} onChange={handleChange} className="mr-2 text-blue-500"
                          />
                          Active
                        </label>
                        <label
                          htmlFor="completed" className="text-gray-700 dark:text-gray-200 sm:flex-grow"
                        >
                          <input type="checkbox" id="completed" name="projectStatus" value="completed" checked={formData.projectStatus.includes("completed")}
                            onChange={handleChange} className="mr-2 text-gray-700 dark:text-gray-200"
                          />
                          Completed
                        </label>
                      </div>
                    </div> 
                    <div>
                      <label
                        htmlFor="projectid" className="text-gray-700 dark:text-gray-200"
                      >
                        Project ID
                      </label>
                      <input required id="projectid" type="number" name="projectId" value={ localStorage.getItem('id')  ? Number(id_) :  formData.projectId}
                        onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="flex items-center justify-center px-4 py-2 bg-blue-200 text-blue-800 rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-300"
                    >
                      {localStorage.getItem('id') ? `${ Edit ? 'loading...' : 'Update'  }` : `${ Add ? 'loading...' : 'Save'  }`}
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
export default ProjectForm;
