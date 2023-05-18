import axios from "axios";

export const Http = () => {
  return axios.create({
    baseURL: "https://private-0ced4-pebmeddesafiofrontend.apiary-mock.com",
  });
};
