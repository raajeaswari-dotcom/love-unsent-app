const API_BASE_URL: string = import.meta.env.MODE === "development"
  ? "http://localhost:10000/api"
  : "https://love-unsent-backend-new.onrender.com/api";

export default API_BASE_URL;
