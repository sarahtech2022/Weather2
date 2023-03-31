import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'


const City = ({formSubmissionData, toUpdate, toDelete}) => {
    const [city, setCity] = useState("");
  const [result, setResult] = useState(null);


    const onUpdate = (toUpdateStudent) => {
        toUpdate(toUpdateStudent)
    }

    const onDelete = (toDeleteStudent) => {
        toDelete(toDeleteStudent)
    }





    return (
        <Card>
            <Card.Body>
            <Card.Title> {formSubmissionData.name} {formSubmissionData.city}  </Card.Title>
            <Button variant="outline-danger" onClick={()=>{onDelete(formSubmissionData)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
           
            </Card.Body>
        </Card>
    )

}
//  <Button variant="outline-info" onClick={()=>{onUpdate(weatherData)}} style={{padding: '0.6em'}}> <ioicons.IoSync/></Button>
export default City;