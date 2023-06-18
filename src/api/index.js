import axios from "axios";
import toast from "react-hot-toast";
import ImageKit from "imagekit";

export const baseUrl = axios.create({
  baseURL: 'https://contact.herokuapp.com'
})

// baseUrl.interceptors.request.use(request => {
//   return request
// })

baseUrl.interceptors.response.use(
  (response) => {
    return response
  }, (error) => {
    toast.error(error.message)
    return Promise.reject(error)
  },
)

export const apiClient = baseUrl

export const imagekitClient = new ImageKit({
  publicKey : "public_A6eRkJmN3YarQIniuNrCBTMv4OY=",
  privateKey : "private_HnG6Va4roRU/7W8uItgZFojEz1s=",
  urlEndpoint : "https://ik.imagekit.io/l9bdb9igs/"
});
