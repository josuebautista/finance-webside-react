import axios from "axios";
const TOKEN = "cg38529r01qh2qlfejd0cg38529r01qh2qlfejdg";

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})