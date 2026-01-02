import {jwtDecode} from 'jwt-decode'

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const getUsername =()=>{
  const token = localStorage.getItem("token");
  if(!token) return null;

  const decode = jwtDecode(token);
  return decode.sub;
}
