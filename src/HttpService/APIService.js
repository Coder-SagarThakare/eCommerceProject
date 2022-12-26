import { axiosInstance } from "../components/Interceptor";


// var baseUrl = "https://ngminds.herokuapp.com";
// var  baseUrl = "https://shop-api.ngminds.com"

export function secureGet(url){
    // const newUrl = baseUrl + url;
    return axiosInstance.get(url);           // pass only httprequest not newurl
}

export default function securePost(url, data) {

    console.log("in securepost");
//   const newUrl = baseUrl + url;
  return axiosInstance.post(url, data);
}

export function patch(url,data){
    return axiosInstance.patch(url, data)
}

export function secureDelete(url,id){
    return axiosInstance.delete(`${url}${id}`)
}

export function verifyMailId(url){
    

}