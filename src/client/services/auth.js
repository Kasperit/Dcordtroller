import { apiCall, setTokenHeader } from "./api";
import decode from "jwt-decode";

class Auth {
  constructor(domain) {
    this.domain = domain || "http://localhost:8081";
  }

  authUser = (type, userData) => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `${this.domain}api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          this.setToken(token);
          setTokenHeader(token);
          console.log(user);
          return resolve(user);
        })
        .catch(err => {
          return reject(err);
        });
    });
  };

  loggedIn = () => {
    return !!this.getToken();
  };

  setToken = token => {
    localStorage.setItem("token", token);
  };

  getToken = () => {
    return localStorage.getItem("token");
  };

  logout = () => {
    localStorage.removeItem("token");
  };

  getProfile = () => {
    return decode(this.getToken());
  };
}

export default Auth;
