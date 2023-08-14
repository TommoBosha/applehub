import axios from "axios";

axios.defaults.baseURL = "https://applehub.onrender.com/";

export async function addOrder(formData) {
    try {
        const response = await axios.post("order/add-order", formData);
        return response;
    } catch (error) {
        throw error;
    }
}