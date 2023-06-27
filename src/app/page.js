"use client";

import React, { useState, useEffect } from "react";
import Table from "./components/Tables/Index";

export default function page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.clear()


    const fetchData = async () => {
      try {
        const response1 = await fetch("/getproject", { method: "GET" });
        const response2 = await fetch("/getclient", { method: "GET" });
        if (!response1.ok || !response2.ok) {
          throw new Error("Failed to fetch data");
        }
        const data1 = await response1.json();
        const data2 = await response2.json();

        const combinedData = data1.map((item1, index) => {
          const item2 = data2[index];
  
          return {
            projectName: item1?.projectName,
            projectStatus: item1?.projectStatus,
            id: item1?.id,
            clientName: item2?.clientName,
            ClientImage: item2?.ClientImage,
            gender: item2?.gender,
            client_id: item2?.id,
          };
        });

        console.log(combinedData, "combinedData");

        setData(combinedData);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="text-center mb-8 bg-[#DBEAFE] py-4">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Project Management System
        </h1>
      </div>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <Table data={data} />
          </div>
        )}
      </main>
    </>
  );
}
