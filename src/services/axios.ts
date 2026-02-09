import axios, {type AxiosError, type InternalAxiosRequestConfig} from "axios"


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    maxBodyLength: 10240,
})

api.interceptors.request.use(
    async (config) => {
        if (!(config.data instanceof FormData) && config.headers) {
            config.headers["Content-Type"] = "application/json";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    (response) => response,
    async (err: AxiosError) => {
        const originalRequest = err.config as InternalAxiosRequestConfig & { _retry?: boolean };
        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // BURADA: Refresh token sorğusu atmalısan
                // const { data } = await axios.post('/auth/refresh', { token: refreshToken });
                // const newAccessToken = data.accessToken;

                // Yeni tokeni başlıqlara əlavə et
                // originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // Sorğunu yeni tokenlə təkrarla
                return api(originalRequest);
            } catch (refreshError) {
                // Əgər refresh token də keçərsizdirsə, istifadəçini login-ə at
                return Promise.reject(refreshError);
            }
        }

        // 2. Digər bütün hallarda xətanı geri qaytar (Vacibdir!)
        return Promise.reject(err);
    }
);
export default api;