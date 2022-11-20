import React,{useRef, useState} from 'react'
import {Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { collection, doc, updateDoc, setDoc} from "firebase/firestore";
import {auth, db} from '../firebase'
import { initializeApp } from "firebase/app";   
import { getAuth, onAuthStateChanged } from "firebase/auth";


function Register() {
    const {signup, logout, currentUser} = useAuth()
    const emailRef = useRef()
    const cedRef = useRef()
    const nameRef = useRef()
    const apellRef = useRef()

    // referencias para los empleados
    const nacRef = useRef()
    const domicRef = useRef()
    const movRef = useRef()
    const fechVacRef = useRef()
    const numDosisRef = useRef()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [selects, setSelects] = useState()
    const [vacuna, setVacuna] = useState()
    const navigate = useNavigate()
    const jefe = 'jefe@jefe.com'
  


// function for login new employee
async function submit(e) {
    e.preventDefault()
    try {
            setError('')
            setLoading(true)

    

    // escritura de datos para el aministrador
    if (auth.currentUser.email == jefe) {
        await signup(emailRef.current.value, emailRef.current.value) //singup in firebase
        // asi se coge los usuarios
    
    let userID =  auth.currentUser.uid != null ? auth.currentUser.uid : ' '
  
      // envío de datos al presente usuario
      await db.doc(`Users/${userID}/`).set({
          ced: cedRef.current.value,
          name: nameRef.current.value,
          lname: apellRef.current.value,
          mail : emailRef.current.value,
          birth: '',
          address : ' ',
          phone : ' ',
          vacState: "No Vacunado",
          vacTy : ' ',
          vacDate : ' ',
          dosisNum : ' ',
      })
 
      window.alert('Haz creado un empleado satisfactoriamente, tu usuario y contraseña son el email que acabas de ingresar.')
    //   await logout()
      navigate('/Login')

    
    } else {

    // actualizamos info
    let userID =  auth.currentUser.uid != null ? auth.currentUser.uid : ' '
     
    // direeción de actualización
    const refer = doc(db, "Users", userID);
    if (selects === 'Vacunado') {
        await updateDoc(refer, {
            birth: nacRef.current.value,
            address : domicRef.current.value,
            phone : movRef.current.value,
            vacState: selects,
            vacTy: vacuna,
            vacDate: fechVacRef.current.value,
            dosisNum: numDosisRef.current.value,
        }) 
    } else if (selects === 'No Vacunado') {
        await updateDoc(refer, {
            birth: nacRef.current.value,
            address : domicRef.current.value,
            phone : movRef.current.value,
            vacState: selects,
        }) 
    }

    navigate('/')

    }

        } catch (error) {
            setError(error.toString())
        }
        setLoading(false)
       
    }
  return (
    <>
       <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>
                { 
                auth.currentUser.email === jefe ? 'Nuevo empleado': 'Actualizar información'
                }
            </h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={submit}>

                 {/*campos para llenar el administrador  */}
     
                <Form.Group id='cedula'>
                <Form.Label>Cédula</Form.Label>
                <Form.Control type='text' ref={cedRef} pattern="[0-9]+" maxLength={10} minLength={10} required/>
            </Form.Group>
            <Form.Group id='nombres'>
                <Form.Label>Nombres</Form.Label>
                <Form.Control type='text' ref={nameRef} pattern="[a-zA-Z]+" required/>
            </Form.Group>
            <Form.Group id='apellidos'>
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type='text' ref={apellRef} pattern="[a-zA-Z]+" required/>
            </Form.Group>
            <Form.Group id='email'>
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control className='mb-4' type='email' ref={emailRef} required/>
            </Form.Group>

                {/* CAMPOS PARA LLENAR EL EMPLEADO */}
            {currentUser.email !== jefe && <>
            <Form.Group id='fecha'>
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control className='mb-4' type='number' ref={nacRef} maxLength={4} minLength={4} max={2000} required/>
            </Form.Group>
            <Form.Group id='domicilio'>
                <Form.Label>Dirección de domicilio</Form.Label>
                <Form.Control className='mb-4' type='text' ref={domicRef} required/>
            </Form.Group>
            <Form.Group id='movil'>
                <Form.Label>Teléfono Móvil</Form.Label>
                <Form.Control className='mb-4' type='text' ref={movRef} required/>
            </Form.Group>
            {/* seleccionar si está o no vacunado */}
            <Form.Group className='mb-4' id='estvac'>
                <Form.Label>Estado de vacunación </Form.Label>
                <select className='mb-4 mt-2' id="select1" class="form-select" value={selects} onChange={e => setSelects(e.target.value)}>
                        <option className='mb-2' selected>Selecciona</option>
                        <option value="Vacunado">Vacunado</option>
                        <option value="No Vacunado">No Vacunado</option>
                 </select>
            </Form.Group>       
            
          
             {
                selects === 'Vacunado' &&
                <>
                <Form.Group id='tvacuna'>
                <Form.Label>Tipo de vacuna</Form.Label>
                <select className='mb-4 mt-2' id="select2" class="form-select" value={vacuna} onChange={e => setVacuna(e.target.value)}>
                        <option className='mb-2' selected>Selecciona</option>
                        <option value="Sputnik">Sputnik</option>
                        <option value="AstraZeneca">AstraZeneca</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
                 </select>
            </Form.Group>
                <Form.Group id='fvac'>
                    <Form.Label>Fecha de vacunación</Form.Label>
                        <Form.Control className='mb-4' type='text' ref={fechVacRef} required />
                </Form.Group><Form.Group id='ndosis'>
                <Form.Label>Número de dosis</Form.Label>
                    <Form.Control className='mb-4' type='text' ref={numDosisRef} required />
                </Form.Group>
                </>

             }
            </>
            }
            <Button disabled={loading} className='w-100 mt-10' type='submit'> Registrar </Button>
            </Form>
        </Card.Body>
       </Card>
        <div className='w-100 text-center mt-2'>
          <Link to={"/"}>Atrás</Link>
        </div>
    </>
  )
}

export default Register