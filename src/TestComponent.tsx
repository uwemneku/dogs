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
import { Container } from '@material-ui/core';
import { DogBreeds } from './allTypes';
import { dropDownListCallback } from './components/DropDownList';


const TestComponent:React.FC = () => {
  const [dogInfo, setDoginfo] = useState<DogBreeds>({});
  const [selectedInfo, setSelectedInfo] = useState<{breed: string, subBreed: string}>({breed: '', subBreed: ''})
  const [randomImage, setRandomImage] = useState<string |null >(null)
  const [subBreedList, setsubBreedList] = useState<string[]>([])
  const breedArray = Object.keys(dogInfo)

  useEffect( () => {
    (async () => {
      const dogs = await getDogs()
      setDoginfo(dogs)
    })()
  }, [])


const handleSelection: dropDownListCallback = (inputName, value) => {
    inputName === 'breed' ?
        setSelectedInfo({breed:value, subBreed:''}) // reset subBreed when breed changes
        :
        setSelectedInfo({...selectedInfo, [inputName]:value })
    
}

useEffect(() => {
    selectedInfo.breed !== "" && setsubBreedList(dogInfo[selectedInfo.breed]);
    selectedInfo.subBreed !== "" && fetchImage(selectedInfo.breed, selectedInfo.subBreed).then(e => setRandomImage(e))
}, [selectedInfo])



  return (
    <div>
      {
        (breedArray.length > 0) ?
          <DropDownList list={breedArray} id='breed' name='Dog Breed' onSelect={handleSelection} />
          :
          <p>waiting for data..</p>
      }
      {
        (selectedInfo.breed !== "") &&
        (
          (subBreedList.length > 0) ?
            <DropDownList list={subBreedList} id='subBreed' name='Sub Breed' onSelect={handleSelection} />
            :
            'The seleted Breed has no sub breed'
        )
      }
      {
        (randomImage) &&
        <Container maxWidth="xs"  >
          <img alt='random_image' src={randomImage} width='100%' />
        </Container>
      }
    </div>
  );



}
export default TestComponent;
