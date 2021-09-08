import axios, { AxiosResponse } from "axios";
import { DogApiResponse, DogBreeds } from "../allTypes";


type Response<T> = AxiosResponse<DogApiResponse<T>>

export const getDogs = async(): Promise<DogBreeds> => {
    const dogs:Response<DogBreeds> = await axios({
        url: 'https://dog.ceo/api/breeds/list/all',
        method: 'get'
    });
    return dogs.data.message
}


export const fetchImage = async (breed: string, subBreed: string):Promise<string> => {
    const image:Response<string> = await axios({
        url: `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`,
        method: 'get'
    });
    return image.data.message
}