"use client"

import React, { useState, useEffect } from "react";
import Table from "./components/Tables/Index";


export default function page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/getproject', { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data)
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
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Project Management System</h1>
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




