/*
Doggy Image Search!

This snippet of code below implements  an API call that fetches a whole lot of dog breeds and displays it in a selection box:

Following the same react-hook style below, please implement the following:

- A second dropdown box that lists the sub-breeds of the dogs. If you interrogate the api request data returned in the useEffect hook, you will see the additional information is already available.

- With those two pieces of information, write a method that gets a random image from the dog.ceo API and display it on the screen.

The full dog API documentation is available here:
https://dog.ceo/dog-api/documentation/


Finally, Add typescript to the project and define an interface for the data coming in from the axios call, as well as the useState hooks.

When you have completed the project: ensure that:
there are no errors in the console, 
Elements are broken up into reusable components so that the code base is neat and code repetition is reduced.
Ideally any props that are defined in components should also have typescript interfaces defined.



*/


import React, { useState, useEffect } from 'react';
import DropDownList from './components/DropDownList';
import { fetchImage, getDogs } from './helper/fetchInfo';
import { Box, Container, makeStyles } from '@material-ui/core';
import { DogBreeds } from './allTypes';
import { dropDownListCallback } from './components/DropDownList';

interface Options{
    breed: string;
    subBreed: string;
}

const useStyles = makeStyles(() => ({
    container:{
        display:'flex',
        justifyContent:'center'
    }
}));

const TestComponent: React.FC = () => {
    const [dogInfo, setDoginfo] = useState<DogBreeds>({}); 
    const [userSelection, setUserSelection] = useState<Options>({ breed: '', subBreed: '' })
    const [randomImage, setRandomImage] = useState<string | null>(null)
    const [subBreedList, setsubBreedList] = useState<string[]>([]) // stores the sub-breeds from a selected breed
    const breedArray = Object.keys(dogInfo)
    const classes = useStyles()

    useEffect(() => {
        (async () => {
            const dogs = await getDogs()
            setDoginfo(dogs)
        })()
    }, [])


    const handleSelection: dropDownListCallback = (inputName, value) => {
        if (inputName === 'breed') {
            setUserSelection({ breed: value, subBreed: '' }) // reset subBreed when breed changes
            setRandomImage(null)
        } else if (inputName === 'subBreed') {
            setUserSelection({ ...userSelection, subBreed: value }) //
        }
    }

    useEffect(() => {
        userSelection.breed !== "" && setsubBreedList(dogInfo[userSelection.breed]); // Change the subBreed array when breed changes
        userSelection.subBreed !== "" && fetchImage(userSelection.breed, userSelection.subBreed).then(e => setRandomImage(e)) // Displays a random image when the sub-breed changes
    }, [userSelection])



    return (
        <div>
            {/*Dropdown list of dog breeds starts here */}
            {
                (breedArray.length > 0) ?
                    <DropDownList data={breedArray} id='breed' name='Dog Breed' onSelect={handleSelection} />
                    :
                    <p>waiting for data..</p>
            }
            {/*dog breeds ends here */}

            {/*Dropdown list of sub-breeds start here */}
            {
                (userSelection.breed !== "") &&
                (
                    (subBreedList.length > 0) ?
                        <DropDownList data={subBreedList} id='subBreed' name='Sub Breed' onSelect={handleSelection} />
                        :
                        'The seleted Breed has no sub breed'
                )
            }
            {/*sub-breeds ends here */}

            {
                (randomImage) &&
                <Container maxWidth='xs' className={classes.container} >
                    <figure style={{width:200, height:200}} >
                        <img alt='random_image' src={randomImage} width='100%' />
                    </figure>
                </Container>
            }
        </div>
    );



}
export default TestComponent;
