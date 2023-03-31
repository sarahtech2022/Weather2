import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import MyForm from './Form';
import City from './City';

const ListCities = () => {
//I need 2 seperate states, one thats getting the stuff from the database and one thats getting it from the weather API
//cities is keeping track of what is comin from database: name, id, city, fave
//the second state needs to keep track of the weather API, in the map I would need to loop over the cities, as i am alread,
//AND the weather API stuff.  
    // const getWeatherCity= () => {

    // }

    // this is my original state with an array of students 
    //form component pushes to this state!!!
    const [cities, setCities] = useState([]);


    //Create new array in parent!
    const addCity= (newCity) => {
        setCities([...cities, newCity ]);
    };

    //this is the state needed for the UpdateRequest
    // const [editingStudent, setEditingStudent] = useState(null)

    //**************************************************************** */
    //This is the state I will use to create a function to pass in as a prop to form to help me get the 
    //data from there!!! Then I will sent setGetFormInfo function into the Form component as a prop!

//This is loading stuff from my database:
    const loadStudents = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch("http://localhost:8080/api/students")
            .then((response) => response.json())
            .then((students) => {
                setCities(students);
            });
    }

    useEffect(() => {
        loadStudents();
    }, [cities]);

    const onSaveStudent = (newStudent) => {
        //console.log(newStudent, "From the parent - List of Students");
        setCities((students) => [...students, newStudent]);
    }


    //A function to control the update in the parent (student component)
    const updateStudent = (savedStudent) => {
        // console.log("Line 29 savedStudent", savedStudent);
        // This function should update the whole list of students - 
        loadStudents();
    }

    //A function to handle the Delete funtionality
    const onDelete = (student) => {
        //console.log(student, "delete method")
        return fetch(`http://localhost:8080/api/students/${student.id}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadStudents();
            }
        })
    }

    //A function to handle the Update functionality
    // const onUpdate = (toUpdateStudent) => {
    //     //console.log(toUpdateStudent);
    //     setEditingStudent(toUpdateStudent);

    // }

    ///****************************** */
    //With Gisselle
    // const getFormInfo= (name, city, fave) => {
    //     console.log(name, city, fave )
    // }
///****************************** */


//A function to do the get request and set the state from openweather api
  const loadCity = (city) => {
    console.log(city, "This is my weather fetch");
    // pass city name as a param
    const params = new URLSearchParams({ cityName: city });
    // fetch the data from the backend
    fetch(`http://localhost:8080/weather?${params}`)
      .then((response) => response.json())
      .then((result) => {
        // console.log("this is the data: ", result)
        addCity(result);
        
      });
  };
  //loadcity is an asych operation and cant do it inside a component because its synchronous!!!

  const handleSubmit = (city) => {
      loadCity(city)
  }





// console.log({ cities }, performance.now());
    return (
        <div className="mybody">
        <div className="list-students">
            <h2>City Weather Search </h2>
            <ul>
                {cities.map((city, index) => {  //in map u have access to the city and the index (easy way) 
                   //Here create another variable and do other state (weatherData=weatherArray[index]) //weatherArray is my state
                   return <li key={index}> <City formSubmissionData={city} toDelete={onDelete}   /></li>
                })}
            </ul>
        </div>
        <MyForm onSaveStudent={onSaveStudent}    addCity={addCity} onSubmit={handleSubmit} />
        </div>
    );
}
//setCities={setCities}

export default ListCities;