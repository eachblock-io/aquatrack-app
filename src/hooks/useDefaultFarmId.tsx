import { useGetFarmDataQuery } from "@/redux/services/farmApiSlice";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import { useState, useEffect } from "react";

// Custom hook to manage default farm ID and update it
const useDefaultFarmId = () => {
  const { data } = useGetCurrentUserQuery(null);
  console.log(data?.data?.organizations[0]?.farms[0]?.id);
  // Initialize state for default farm ID
  const [defaultFarmId, setDefaultFarmId] = useState(() => {
    // Retrieve default farm ID from local storage or use the first farm ID from the array
    const storedFarmId =
      typeof window === "undefined"
        ? localStorage.getItem("defaultFarmId")
        : null;
    return storedFarmId || data?.data?.organizations[0]?.farms[0]?.id;
  });

  const { refetch } = useGetFarmDataQuery({
    farmId: defaultFarmId,
  });

  // Update default farm ID in local storage when it changes
  useEffect(() => {
    if (typeof window === "undefined") {
      localStorage.setItem("defaultFarmId", defaultFarmId);
    }
  }, [defaultFarmId]);

  // Function to update default farm ID when a farm button is clicked
  const handleFarmClick = (id: any) => {
    setDefaultFarmId(id);
    refetch();
  };

  return { defaultFarmId, handleFarmClick };
};

export default useDefaultFarmId;
