"use client";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import { useState, useEffect } from "react";

// Custom hook to manage default farm ID and update it
const useDefaultFarmId = () => {
  const { data } = useGetCurrentUserQuery(null);
  // Initialize state for default farm ID
  const [defaultFarmId, setDefaultFarmId] = useState(() => {
    // Retrieve default farm ID from local storage
    if (typeof window !== "undefined") {
      // Retrieve default farm ID from local storage
      const storedId = localStorage.getItem("defaultFarmId");
      // If the value exists in localStorage, return it, otherwise use the first farm ID from the array
      return storedId ? storedId : data?.data?.organizations[0]?.farms[0]?.id;
    } else {
      // If window is not defined (e.g., during server-side rendering), return null or some default value
      return null;
    }
  });

  // Update default farm ID in local storage when it changes
  useEffect(() => {
    if (window != undefined) {
      localStorage.setItem("defaultFarmId", defaultFarmId);
    }
  }, [defaultFarmId]);

  // Function to update default farm ID when a farm button is clicked
  const handleFarmClick = (id: any) => {
    setDefaultFarmId(id);
    if (window != undefined) {
      location.reload();
    }
  };

  return { defaultFarmId, handleFarmClick };
};

export default useDefaultFarmId;
