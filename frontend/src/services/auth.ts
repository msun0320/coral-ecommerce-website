const API_URL: string = "http://localhsost:8080/api/auth";

class AuthService {
  login(username: string, password: string) {
    return fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        username,
        password,
      },
    })
      .then((response: any) => response.json())
      .then((responseJson: any) => {
        if (responseJson) {
          localStorage.setItem("token", responseJson.jwt);
        }

        return responseJson;
      })
      .catch((error: any) => console.warn(error));
  }

  logout() {
    localStorage.removeItem("token");
  }

  register(username: string, password: string) {
    return fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        username,
        password,
      },
    }).catch((error: any) => console.warn(error));
  }

  getCurrentUser() {
    const token: any = localStorage.getItem("token");

    return token;
  }
}

export default new AuthService();
