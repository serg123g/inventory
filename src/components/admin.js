import React, {useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Alert,Form } from 'react-bootstrap'
import {db} from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export default function Admin() {
  const [info , setInfo] = useState([]);
  const movRef = useRef()
  const [loading, setLoading] = useState(false)

  function clicked(){
    var btn1 = document.getElementById("btn1");
    btn1.disabled = true;
  }

  // Traemos datos de la base de datos

  const Fetchdata = () => {
    db.collection("Users").get().then((querySnapshot) => {
            
      // Loop through the data and store
      // it in array to display
      querySnapshot.forEach(element => {
          var data = element.data();
          setInfo(arr => [...arr , data]);
          
      });
  })
}

// funcion para eliminar empleados
const DeleteE = (e) => {
  e.preventDefault()
try {

  db.collection("Users")
  .where("mail","==", movRef.current.value)
  .get().then((querySnapshot) => {
          
    // Loop through the data and store
    // it in array to display
    querySnapshot.forEach(element => {
      const docRef = doc(db, "Users", element.id)
      deleteDoc(docRef)
      console.log(element.id)
        var data = element.data();
        // setInfo(arr => [...arr , data]);
    });
})
} catch (error) {
  window.alert(error)
} 
  
}

  return (
    <>
    <Card className='mt-4'>
      <Card.Body>
        <h3 className='text-center mb-2'>Administrar Empleados</h3><meta charSet='UTF-8' />
        <Link to="/register" className='btn btn-primary w-100 mt-3'>Registrar Nuevo</Link>
        {/* <Link to="/edit" className='btn btn-primary w-100 mt-3'>Editar</Link> */}
        <Link to="/filter" className='btn btn-primary w-100 mt-3'>Filtrar</Link>
        </Card.Body>
    </Card>  
    <Card className='mt-4'>
      <Card.Body>
      <h2 className='text-center mb-4 underline'> Empleados </h2>
      <button className='btn btn-primary w-100 mt-3' id='btn1' onClick={() => {Fetchdata(); clicked();}} >Ver Empleados</button>
      {
        info.map((data) => (
          <Card className='mt-2 mb-2'>
            <p>Nombre: {data.name} --  Email: {data.mail} </p>
            <p>Estado: {data.vacState} </p> 
          </Card>
        ))
      }
      <Card className='mt-4'> 
        <Card.Body>
        <Form onSubmit={DeleteE}>
      <Form.Group id='movil'>
                <Form.Label>Mail del empleado a Eliminar</Form.Label>
                <Form.Control className='mb-4' type='email' ref={movRef} required/>
      </Form.Group>
      <Button disabled={loading} className='w-100 mt-10' type='submit'> Eliminar </Button>
      </Form>
      
        </Card.Body>

      </Card>
    
     
      </Card.Body>
    </Card>

    </>
  )
}
