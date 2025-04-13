import { loadConfig } from "./config/configManager";
import { attachAxiosInterceptor } from "./interceptors/axiosInterceptor";
import axios from "axios";

loadConfig(); // loads and prints config from tracker.config.json
attachAxiosInterceptor();

// Example of making a request to trigger the interceptor
axios.post('https://jsonplaceholder.typicode.com/posts', {
  title: 'Hello API!',
  body: 'Testing interceptor',
}).then(response => {
  console.log('Response received:', response.data);
}).catch(error => {
  console.error('Error:', error.message);
});

console.log("__dirname is:", __dirname);
