import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientID = "56c10a1b328747a49efe565680c1cd7b";
// const redirectUri = "https://loc-music-player-npj2.vercel.app/";
const redirectUri = "https://xuanloc.vercel.app/";
// const redirectUri = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private", "user-follow-read", "user-top-read"];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${encodeURIComponent(
    redirectUri
)}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
};

export default apiClient;
