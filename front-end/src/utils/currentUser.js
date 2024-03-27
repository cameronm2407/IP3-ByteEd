import { jwtDecode } from "jwt-decode";

const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token); // Correctly decoding the JWT token
    console.log(decoded.user);
    return decoded.user;
  }
};

export default getCurrentUser;