import { apiCall, setTokenHeader } from "./api";
class Auth {
  constructor(domain) {
    this.domain = domain || "http://localhost:8081";
    this.user = null;
  }

  authUser = (type, userData) => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `${this.domain}api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          this.setToken(token);
          setTokenHeader(token);
          this.user = user;
          return resolve(user);
        })
        .catch(err => {
          console.log(err.message);
          reject();
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
    this.setState({
      user: null
    });
    localStorage.removeItem("token");
  };

  getProfile = () => {
    return this.state.user;
  };
}

export default Auth;
