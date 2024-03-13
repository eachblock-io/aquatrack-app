import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useState, useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// function Greeting() {
//   const [timeOfDay, setTimeOfDay] = useState("");

//   useEffect(() => {
//     const currentTime = new Date().getHours();
//     let greeting;

//     if (currentTime >= 5 && currentTime < 12) {
//       greeting = "Morning";
//     } else if (currentTime >= 12 && currentTime < 18) {
//       greeting = "Afternoon";
//     } else {
//       greeting = "Evening";
//     }

//     setTimeOfDay(greeting);
//   }, []);

//   return (
//     <div>
//       <h1>Good {timeOfDay}, User!</h1>
//     </div>
//   );
// }


