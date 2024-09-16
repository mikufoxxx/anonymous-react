import axios from "axios";
import useStore from "../store";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axios.interceptors.request.use(function () {
  const { currentStudent } = useStore.getState();
  if (!currentStudent) {
    location.href = "/signin"
  }
});

Api.interceptors.response.use(
  response => {
    // 如果请求成功，直接返回响应
    if (response && response.data && response.data.message) {
      toast.info(response.data.message); // 使用 Toastify 弹出错误信息
    }
    return response;
  },
  error => {
    // 处理错误响应
    const { response } = error;
    if (response && response.data && response.data.message) {
      toast.error(response.data.message); // 使用 Toastify 弹出错误信息
    } else {
      toast.error('An unexpected error occurred.'); // 默认错误信息
    }
    return Promise.reject(error); // 继续抛出错误
  }
);