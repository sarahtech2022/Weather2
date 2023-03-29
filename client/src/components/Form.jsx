import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"

const MyForm = ({ onSaveStudent, onUpdateStudent }) => {

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


    //A function to handle the submit in both cases - Post and Put request!
    //When the form is submitted, call the function the parent gives it 
    //Form needs to tell Listcities, I have a new city for u to keep track of!!
    const handleSubmit = (e) => {
        e.preventDefault(); //preventing browser from doing default stuff, like reloading page
        // if (student.id) {
        //     putStudent(student);
        // } else {
        //     postStudent(student);
        // }
        
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