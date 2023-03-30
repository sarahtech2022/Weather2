import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"

const MyForm = ({ onSaveStudent, onUpdateStudent, addCity}) => {

    // This is the original State with not initial student 
    const [city, setCity] = useState( { //this city is my STATE*****
        name: "",
        city: "",
        fave: false
    });

    //create functions that handle the event of the user typing into the form
    const handleNameChange = (event) => {
        const name = event.target.value;
        setCity((prevState) => ({ ...prevState, name }));  //do the spread operator, because those 3 things are in one object and du dont wanna lose what the user typed before

    };

    const handleCityChange = (event) => {
        const city = event.target.value;
        setCity((prevState) => ({ ...prevState, city})); //city in yellow, is the previous state value I had *****
    };

    const handleCheckChange = (event) => {
        const fave = event.target.checked;
        //console.log(iscurrent);
        setCity((prevState) => ({ ...prevState, fave }));
    };

    const clearForm = () => {
        setCity({ name: "", city: "", fave: false })
    }

    //A function to handle the post request
    const postStudent = (newStudent) => {
        // console.log(newStudent, "hi I am the post request");
        return fetch("http://localhost:8080/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStudent),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log("From the post ", data);
                //I'm sending data to the List of Students (the parent) for updating the list
                onSaveStudent(data);
                // console.log(data);
                //this line just for cleaning the form
                clearForm();
            });
    };

    //A function to handle the post request
    const putStudent = (toEditStudent) => {
        return fetch(`http://localhost:8080/api/students/${toEditStudent.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toEditStudent),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                onUpdateStudent(data);
                //this line just for cleaning the form
                clearForm();
            });
    };


//A function to do the get request and set the state from openweather api
  const loadCity = (city) => {
    console.log(city, "This is my weather fetch");
    // pass city name as a param
    const params = new URLSearchParams({ cityName: city });
    // fetch the data from the backend
    fetch(`http://localhost:8081/weather?${params}`)
      .then((response) => response.json())
      .then((result) => {
        // console.log("this is the data: ", result)
        setCity(result.name);
        setResult(result);
        
      });
  };
  //loadcity is an asych operation and cant do it inside a component because its synchronous!!!




    //A function to handle the submit in both cases - Post and Put request!
    //When the form is submitted, call the function the parent gives it 
    //Form needs to tell Listcities, I have a new city for u to keep track of!!
    const handleSubmit = (e) => {
        e.preventDefault(); //preventing browser from doing default stuff, like reloading page
        if (city.id) {
            putStudent(city).then(() => {addCity(city)});
        } else {
            postStudent(city).then(() => {addCity(city)});
        }
        // setGetFormInfo(city.name, city.city, city.fave )
        console.log("This is my handlesubmit")

        // if (city.id) {
        //     putStudent(city);
        //     console.log("I am the put request")
        // } else {
        //     postStudent(city);
        //     console.log("I am the post request")
        // }

        // setFormInfo([city.name, " ", city.city, city.fave]) //must be in an array format!!!!!! dont need spread operator??!!!
       // two ways to do it: provide both cities and setcity - form will provide an array to city (form defines logic)
       //Provide one function as a prop to form that recieves a city (parent defines the logic)--> better code
        // setCity()
       
        loadCity(city);
         clearForm();
        
    };
//Listcites passes a function into form, whatever function Listcities provide will be in handleSubmit
    

    return (
        <Form className='form-students' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <input
                    type="text"
                    id="add-user-name"
                    placeholder="Name"
                    required
                    value={city.name}
                    onChange={handleNameChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>City</Form.Label>
                <input
                    type="text"
                    id="add-user-lastname"
                    placeholder="City"
                    required
                    value={city.city}
                    onChange={handleCityChange}
                />
            </Form.Group>
            <Form.Check
                type={'checkbox'}
                id={`isCurrent`}
                checked={city.fave}
                onChange={handleCheckChange}
                label={`Is it a favorite city?`}
            />
            <Form.Group>
            <Button type="submit" variant="outline-success">{city.id ? "Edit Student" : "Search"}</Button>
            {city.id ? <Button type="button" variant="outline-warning" onClick={clearForm}>Cancel</Button> : null}
            </Form.Group>
        </Form>
    );
};


export default MyForm