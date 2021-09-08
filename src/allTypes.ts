export interface DogApiResponse<T>{
    message: T;
    status: string;
}

export interface DogBreeds{
    [key: string]: string[];
}
