"use client";
import { RiAddLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import TableComponent from "./TableComponent";

function Table({ data }) {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/newclient");
  };
  const handleDelete = async (data) => {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };

      const deleteProjectPromise = fetch(
        `/deleteproject/${data?.id}`,
        requestOptions
      );
      const deleteClientPromise = fetch(
        `/deleteclient/${data?.client_id}`,
        requestOptions
      );

      await Promise.all([deleteProjectPromise, deleteClientPromise]);

      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };

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
              className="flex items-center justify-center px-4 py-2 bg-blue-200 text-blue-800 
              rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-300"
            >
              <RiAddLine className="mr-2" />
              New Project
            </button>
          </div>
        </div>

        <TableComponent handleDelete={handleDelete} data={data} />
      </section>
    </div>
  );
}

export default Table;
