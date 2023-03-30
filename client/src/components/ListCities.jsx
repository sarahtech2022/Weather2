import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import MyForm from './Form';
import City from './City';

const ListCities = () => {

    // this is my original state with an array of students 
    //form component pushes to this state!!!
    const [cities, setCities] = useState([]);


    //Create new array in parent!
    const addCity= (newCity) => {
        setCities([...cities, newCity ]);
    };

    //this is the state needed for the UpdateRequest
    const [editingStudent, setEditingStudent] = useState(null)

    //**************************************************************** */
    //This is the state I will use to create a function to pass in as a prop to form to help me get the 
    //data from there!!! Then I will sent setGetFormInfo function into the Form component as a prop!


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
    const onUpdate = (toUpdateStudent) => {
        //console.log(toUpdateStudent);
        setEditingStudent(toUpdateStudent);

    }

    ///****************************** */
    //With Gisselle
    // const getFormInfo= (name, city, fave) => {
    //     console.log(name, city, fave )
    // }
///****************************** */

// console.log({ cities }, performance.now());
    return (
        <div className="mybody">
        <div className="list-students">
            <h2>City Weather Search </h2>
            <ul>
                {cities.map((city, index) => {  //in map u have access to the city and the index (easy way)
                    return <li key={index}> <City student={city} toDelete={onDelete} toUpdate={onUpdate}  /></li>
                })}
            </ul>
        </div>
        <MyForm key={editingStudent ? editingStudent.id : null} onSaveStudent={onSaveStudent} editingStudent={editingStudent} onUpdateStudent={updateStudent} setCities={setCities} addCity={addCity} />
        </div>
    );
}


export default ListCities;