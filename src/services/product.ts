import axios from "axios"

export const getList = async () => {
    try {
        const response = await axios.get('http://10.0.2.2:3002/bp/products')
        return response.data.data
    } catch (error) {
        console.error('el ERROR', error)
        return []
    }
}