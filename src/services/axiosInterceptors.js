import { store } from "../redux/store.js";
import { refreshThunk } from "../redux/auth/operations.js";
import { backAPI, setAuthHeader } from "../utils/axiosUtils.js";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

export const setupAxiosInterceptors = () => {
  backAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/refresh")
      ) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => backAPI(originalRequest));
        }

        isRefreshing = true;

        try {
          const resultAction = await store.dispatch(refreshThunk());

          if (refreshThunk.fulfilled.match(resultAction)) {
            const newToken = resultAction.payload.accessToken;
            setAuthHeader(newToken);
            processQueue(null, newToken);
            return backAPI(originalRequest);
          } else {
            processQueue(resultAction.payload, null);
            return Promise.reject(error);
          }
        } catch (err) {
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
