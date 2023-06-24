const authHeader = () => {
  const token: any = localStorage.getItem("token");

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
};

export default authHeader;
