// "use client";
import Api from "./axios";

const fetchApi = async (url, token, formData) => {
  return fetch(`http://localhost:8050/api${url}`, {
    // method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData ? formData : "",
  });
};

export const getApi = async (url, token) => fetchApi(url, token);
export const postApi = async (url, formData) => Api.post(url, formData);
export const patchApi = async (url, formData) => Api.patch(url, formData);
export const deleteApi = async (url) => Api.delete(url);
