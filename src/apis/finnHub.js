import axios from "axios";
const TOKEN = "cg4es8pr01qun3gisv5gcg4es8pr01qun3gisv60";

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})