"use client";

import { RiDeleteBin5Line } from "react-icons/ri";
import { LuEdit } from "react-icons/lu";
import { RiAddLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Table({ data }) {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/newproject");
  };


const handleDelete = async (data) => {

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };

    fetch(`/deleteproject/${data}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
       window.location.reload();
    })
    .catch((error) => console.log("error", error));
  
}

  return (
    <div>
      <section className="container px-4 mx-auto  ">
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Total projects
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {data?.length}
            </span>
          </div>

          <div>
            <button
              onClick={handleClick}
              className="flex items-center justify-center px-4 py-2 bg-blue-200 text-blue-800 rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-300"
            >
              <RiAddLine className="mr-2" />
              New Project
            </button>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>ID</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Project Name
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Client Name</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Project Status</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Gender
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Client Logo</span>
                        </div>
                      </th>

                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data?.map((item, id) => {
                      return (
                        <tr
                          className="hover:bg-[#97D8C4]  hover:bg-blue-50   "
                          key={id}
                        >
                         
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {Number(item?.id)}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {item?.projectName}
                          </td>

                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white ">
                                  {item?.clientName}
                                </h2>
                                <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                  @
                                  {item?.clientName
                                    ?.replace(/\s/g, "")
                                    ?.toLowerCase()}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                                item.projectStatus === "Completed" || item.projectStatus === "completed" 
                                  ? "bg-emerald-100/60 dark:bg-gray-800"
                                  : item.projectStatus === "Active" || item.projectStatus === "active"
                                  ? "dark:bg-gray-800 bg-blue-100/60"
                                  : "dark:bg-gray-800 bg-pink-100/60"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  item.projectStatus === "Completed" || item.projectStatus === "completed" 
                                    ? "bg-emerald-500"
                                    : item.projectStatus === "Active" || item.projectStatus === "active"
                                    ? "bg-blue-500 "
                                    : " bg-pink-500 "
                                }  `}
                              ></span>

                              <h2
                                className={`text-sm font-normal ${
                                  item.projectStatus === "Completed" || item.projectStatus === "completed" 
                                    ? "text-emerald-500"
                                    : item.projectStatus === "Active" || item.projectStatus === "active"
                                    ? "text-blue-500"
                                    : "text-pink-500"
                                }`}
                              >
                                {item?.projectStatus}
                              </h2>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {item?.gender}
                          </td>

                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <img
                              className="object-cover w-10 h-10 rounded-full"
                              src={`https://http-project-management-items-bucket.s3.amazonaws.com/${item?.ClientImage}`}
                              alt=""
                            />
                          </td>

                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <Link
                                href={{
                                  pathname: "/newproject",
                                  query: { q: `${item?.id}` },
                                }}
                                className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                              >
                                <LuEdit className="text-blue-700" />
                              </Link>

                              <button  onClick={() => handleDelete(item?.id)}   className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                <RiDeleteBin5Line className="text-blue-700" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Table;
