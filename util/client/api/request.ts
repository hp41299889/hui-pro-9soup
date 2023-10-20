import axios from "axios";

const request = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
  });

  return instance;
};

export const nextApi = request(`${process.env.NEXT_PUBLIC_API_URL}/api`);
