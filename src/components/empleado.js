import React,{useState} from 'react'
import { Card } from 'react-bootstrap'
import { Await, Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {db} from '../firebase'


const Empleado = () => {
  const [info , setInfo] = useState([])
  let auth = getAuth()
  let user = auth.currentUser
  let userID =  auth.currentUser.uid != null ? auth.currentUser.uid : ' '
  

  window.addEventListener('load', () => {
    Fetchdata();
  });

  const Fetchdata = () => {
    // getting the data from the function
  db.collection("Users").doc(userID).get().then(
      (querySnapshot) => {
        var data = querySnapshot.data();
        setInfo(arr => [...arr , data])
      }
    )  
  }

  function clicked(){
    var btn1 = document.getElementById("btn1");
    btn1.disabled = true;
}

  return (

    <>
    <button type='button' id='btn1' className='btn btn-primary w-100 mt-3'  onClick={() => {Fetchdata(); clicked();}}>Ver Info</button>
    {
     info.map((data) => (
      <Card className='mt-4'>
      <Card.Body>
      <h3 className='text-center mb-2 mt-2'>Información</h3><meta charSet='UTF-8' />
      <p><strong>Cédula:</strong> {data.ced}</p> 
      <p><strong>Nombres:</strong> {data.name} </p>
      <p><strong>Apellidos:</strong> {data.lname} </p>
      <p><strong>Correo: </strong>{data.mail} </p>
      <p><strong>Fecha de nacimiento:</strong> {data.birth} </p>
      <p><strong>Dirección de Domicilio:</strong> {data.address} </p>
      <p><strong>Teléfono Móvil:</strong> {data.phone} </p>
      <p><strong>Estado de vacunacion:</strong> {data.vacState === 'Vacunado' ? 'Vacunado' : 'No Vacunado'} </p>
      {data.vacState === 'Vacunado' && 
      <>
      <p><strong>Tipo de vacuna:</strong> {data.vacTy}</p>
      <p><strong>Fecha de vacunacion:</strong> {data.vacDate} </p>
      <p><strong>Número de dosis:</strong> {data.dosisNum} </p> 
      </>
       }
      
    <Link to="/register" className='btn btn-primary w-100 mt-3'>Actualizar Datos</Link> 
      </Card.Body>
    </Card>
     )) 
    }
</>
  )
}

export default Empleado
