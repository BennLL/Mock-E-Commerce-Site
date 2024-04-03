import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products`)
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}