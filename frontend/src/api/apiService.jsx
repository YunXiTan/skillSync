import axios, { AxiosPromise } from "axios";
import { toast } from "react-toastify";

const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:5005";

// Create axios instance with default config
const client = axios.create({
  baseURL: API_ENDPOINT + "/api",
  headers: {
    "Content-Type": "application/json",
    platform: "web_app",
  },
});

class APIService {
  static get(path = "", params = { limit: 999 }) {
    return client({
      method: "GET",
      url: path,
      params,
    });
  }

  static post(path = "", data = {}, optionalHeader = {}) {
    return client({
      method: "POST",
      url: path,
      data,
      headers: { ...optionalHeader },
    });
  }

  static patch(path = "", data = {}) {
    return client({
      method: "PATCH",
      url: path,
      data,
    });
  }

  static delete(path = "", data = {}) {
    return client({
      method: "DELETE",
      url: path,
      data: JSON.stringify(data),
    });
  }
}

// Response interceptor for error handling
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Add detailed logging
    console.log("API Error Details:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      baseURL: error.config?.baseURL,
    });

    // Handle network error
    if (error.message === "Network Error") {
      toast.error(
        "Network Error",
        "Please check your internet connection and API endpoint"
      );
      console.error("Network Error Details:", {
        baseURL: API_ENDPOINT,
        isConnected: await checkInternetConnection(),
      });
    }

    const { response } = error;

    if (response) {
      switch (response.status) {
        case 500:
          toast.error("Server Error", "Something went wrong on our end");
          console.error("Server Error");
          break;

        case 502:
          toast.error("Server Down", "Our servers are currently unavailable");
          return Promise.reject({
            data: {
              message: "Server Down!",
            },
          });

        default:
          // Handle any other API errors
          if (response.data?.error && response.data?.message) {
            toast.error(response.data.error, response.data.message);
          } else {
            toast.error(
              "Error",
              response.data?.message || "Something went wrong"
            );
          }
      }

      return Promise.reject(response);
    }

    return Promise.reject(error);
  }
);

// Utility function to check internet connection
const checkInternetConnection = async () => {
  try {
    const response = await fetch("https://8.8.8.8", {
      mode: "no-cors",
    });
    return true;
  } catch (e) {
    return false;
  }
};

export default APIService;
export { client };
