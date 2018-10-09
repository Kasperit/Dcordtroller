import { apiCall } from "./api";

class Discord {
  constructor(domain) {
    this.domain = domain || "http://localhost:8081/";
  }

  connect = (username, code) => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `${this.domain}api/discord/${username}/connect`, {
        code
      })
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(err);
        });
    });
  };

  disconnect = username => {
    return new Promise((resolve, reject) => {
      return apiCall(
        "post",
        `${this.domain}api/discord/${username}/disconnect`,
        null
      )
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(err);
        });
    });
  };

  getProfile = username => {
    return new Promise((resolve, reject) => {
      return apiCall("get", `${this.domain}api/discord/${username}`, null)
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(err);
        });
    });
  };
}

export default Discord;
