import React,{useRef, useState} from 'react'
import {Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
// function for login
async function submit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
          await login(emailRef.current.value, passwordRef.current.value) //singup in firebase
          navigate('/')
        } catch {
            setError('Failed to signin')
        }
        setLoading(false)
       
    }
  return (
    <>
       <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Administrador</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={submit}> 
            <Form.Group id='email'>
                <Form.Label>Correo</Form.Label>
                <Form.Control type='email' ref={emailRef} required/>
            </Form.Group>
            <Form.Group id='password'>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control className='mb-4' type='password' ref={passwordRef} required/>
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-10' type='submit'>Ingresar</Button>
            </Form>
        </Card.Body>
       </Card>
        <div className='w-100 text-center mt-2'>
           ¿Eres empleado? <Link to={"/login2"}>Empleado</Link>
        </div>
    </>
  )
}