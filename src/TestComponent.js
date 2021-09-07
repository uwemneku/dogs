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



function TestComponent() {
  const [dogInfo, setDoginfo] = useState({});
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedSubBreed, setSelectedSubBreed] = useState('')
  const [randomImage, setRandomImage] = useState(null)
  const [subBreedList, setsubBreedList] = useState([])


  useEffect(() => {
    getDogs().then(response => setDoginfo(response))
  }, [])


  useEffect(() => {
    // Reset the subbreed list whenever selected breed changes
    selectedBreed !== "" && setsubBreedList(dogInfo.data.message[selectedBreed]);
  }, [selectedBreed])

  useEffect(() => {
    // Fetch a new image when selected subbreed changes
    selectedSubBreed !== "" && fetchImage(selectedBreed, selectedSubBreed).then(e => setRandomImage(e))
  }, [selectedSubBreed])

  const handleBreedSelection = (e) => {
    setSelectedBreed(e);
    setRandomImage(null)
    setSelectedSubBreed('')
  };

  const handleSubBreedSelection = (e) => {
    setSelectedSubBreed(e);
  };




  return (
    <div>
      {
        (dogInfo && dogInfo.data && dogInfo.data.message) ?
          <DropDownList list={Object.keys(dogInfo.data.message)} id='Dog Breed' name='Dog Breed' onSelect={handleBreedSelection} />
          :
          <p>waiting for data..</p>
      }
      {
        (selectedBreed !== "") &&
        (
          (subBreedList.length > 0) ?
            <DropDownList list={subBreedList} id='subBreed' name='Sub Breed' onSelect={handleSubBreedSelection} />
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
