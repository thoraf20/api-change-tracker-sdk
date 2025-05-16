import { loadConfig } from "./config/configManager";
import { attachAxiosInterceptor } from "./interceptors/axiosInterceptor";
import axios from "axios";

loadConfig();
attachAxiosInterceptor();

// Example of making a request to trigger the interceptor
// "https://jsonplaceholder.typicode.com/posts";
// axios
//   .post("https://api.example.com", {
//     title: "Hello API!",
//     body: "Testing interceptor",
//   })
//   .then((response) => {
//     console.log("Response received:", response.data);
//   })
//   .catch((error) => {
//     console.error("Error:", error.message);
//   });

// console.log("__dirname is:", __dirname);
