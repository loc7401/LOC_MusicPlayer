import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientID = "56c10a1b328747a49efe565680c1cd7b";
const redirectUri = "https://loc-music-player-npj2.vercel.app/";
// const redirectUri = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
    apiClient.interceptors.request.use((config) => {
        config.headers.Authorization = "Bearer " + token;
        return config;
    });
};

export default apiClient;
