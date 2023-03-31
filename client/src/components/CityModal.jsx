import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WeatherCard from './WeatherCard';

function CityModal({cityName, handleSubmit}) {
  const [show, setShow] = useState(false);
  const [dataAPI, setdataAPI]= useState([]);

  const handleClose = () => setShow(false);
const handleShow = (e) => {
  handleSubmit(e);
  setShow(true);
}

  //A function to do the get request and set the state from openweather api
  const loadCity = (city) => {
    console.log(city, "This is my weather fetch");
    // pass city name as a param
    const params = new URLSearchParams({ cityName: city });
    // fetch the data from the backend
    fetch(`http://localhost:8080/weather?q=${params}`) 
      .then((response) => response.json())
      .then((result) => {
        console.log("this is the data: ", result)
        // addCity(result);
        setdataAPI(result);
      
      });
  };
  //loadcity is an asych operation and cant do it inside a component because its synchronous!!!

  


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Click for Weather
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body> {show? <WeatherCard data={dataAPI} /> : null }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default CityModal;