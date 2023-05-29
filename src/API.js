const API_URL = "https://api.metriun.com/";

const send = async (data, token = "", change = false) => {
  const requestData = {
    time: Math.floor(Date.now() / 1000),
    change: change,
    data: data,
  };

  const response = await (
    await fetch(`${API_URL}v1/send`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
  ).json();

  return response;
};

const get = async (token) => {
  const response = await (
    await fetch(`${API_URL}v1/get`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();

  return response;
};

export default {
  send,
  get,
};
