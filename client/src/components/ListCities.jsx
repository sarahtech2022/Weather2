import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import MyForm from './Form';
import City from './City';

const ListCities = () => {

    // this is my original state with an array of students 
    const [students, setStudents] = useState([]);

    //this is the state needed for the UpdateRequest
    const [editingStudent, setEditingStudent] = useState(null)

    //**************************************************************** */
    //This is the state I will use to create a function to pass in as a prop to form to help me get the 
    //data from there!!! Then I will sent setGetFormInfo function into the Form component as a prop!
    const [getFormInfo, setGetFormInfo]= useState([]);

    const loadStudents = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch("http://localhost:8080/api/students")
            .then((response) => response.json())
            .then((students) => {
                setStudents(students);
            });
    }

    useEffect(() => {
        loadStudents();
    }, [students]);

    const onSaveStudent = (newStudent) => {
        //console.log(newStudent, "From the parent - List of Students");
        setStudents((students) => [...students, newStudent]);
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
    return (
        <div className="mybody">
        <div className="list-students">
            <h2>City Weather Search </h2>
            <ul>
                {students.map((city) => {
                    return <li key={city.id}> <City city={city} toDelete={onDelete} toUpdate={onUpdate} getFormInfo={getFormInfo} /></li>
                })}
            </ul>
        </div>
        <MyForm key={editingStudent ? editingStudent.id : null} onSaveStudent={onSaveStudent} editingStudent={editingStudent} onUpdateStudent={updateStudent}  onGetFormInfo={setGetFormInfo}/>
        </div>
    );
}


export default ListCities;