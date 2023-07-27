import axios from "axios";

axios.defaults.baseURL = "https://localhost:3001/";

export async function addOrder(formData) {
    try {
        const response = await axios.post("orders", formData);
        return response;
    } catch (error) {
        throw error;
    }
}