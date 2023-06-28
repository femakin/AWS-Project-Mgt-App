import React from "react";
import Link from "next/link";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuEdit } from "react-icons/lu";

function TableBody({ data, handleDelete }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
      {data?.map((item, id) => {
        return (
          <tr className="hover:bg-[#97D8C4]  hover:bg-blue-50 " key={id}>
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
                    @{item?.clientName?.replace(/\s/g, "")?.toLowerCase()}
                  </p>
                </div>
              </div>
            </td>

            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                  item.projectStatus === "Completed" ||
                  item.projectStatus === "completed"
                    ? "bg-emerald-100/60 dark:bg-gray-800"
                    : item.projectStatus === "Active" ||
                      item.projectStatus === "active"
                    ? "dark:bg-gray-800 bg-blue-100/60"
                    : "dark:bg-gray-800 bg-pink-100/60"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    item.projectStatus === "Completed" ||
                    item.projectStatus === "completed"
                      ? "bg-emerald-500"
                      : item.projectStatus === "Active" ||
                        item.projectStatus === "active"
                      ? "bg-blue-500 "
                      : " bg-pink-500 "
                  }  `}
                ></span>

                <h2
                  className={`text-sm font-normal ${
                    item.projectStatus === "Completed" ||
                    item.projectStatus === "completed"
                      ? "text-emerald-500"
                      : item.projectStatus === "Active" ||
                        item.projectStatus === "active"
                      ? "text-blue-500"
                      : "text-pink-500"
                  }`}
                >
                  {item?.projectStatus?.charAt(0)?.toUpperCase() +
                    item?.projectStatus?.slice(1)}
                </h2>
              </div>
            </td>

            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
              {item?.gender?.charAt(0)?.toUpperCase() + item?.gender?.slice(1)}
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
                    pathname: "/newclient",
                    query: { q: `${item?.id}`, cid: `${item?.client_id}` },
                  }}
                  className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                >
                  <LuEdit className="text-blue-700" />
                </Link>

                <button
                  onClick={() => handleDelete(item)}
                  className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                >
                  <RiDeleteBin5Line className="text-blue-700" />
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
