import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-receitas-fatec-pompeia.herokuapp.com'
})


export default api