import React, {useState} from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Admin from './admin'
import Empleado from './empleado'
import './App.css'
import './index.css'

export default function Dashboard() {
  const [error, setError] = useState("")
  const {currentUser, logout} = useAuth()
  const navigate = useNavigate()
  const usuario = 'jefe@jefe.com'

  async function logoutHandle() {
    setError("")
    try {
      await logout()
      navigate('/login')
    } catch  {
      setError('Failed to log out')
    }
  }

  return (
   <>
    <Card>
      <Card.Body>
      <h2 className='text-center mb-4 underline'>Perfil </h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <strong>Correo:</strong> {currentUser.email}
      <div><strong>Tipo de usuario:</strong> {currentUser.email === usuario ? 'Administrador' : 'Empleado'}</div>
      {currentUser.email === usuario ? <Admin/> : <Empleado/>}
      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
      <Button variant='link' onClick={logoutHandle}>Salir</Button>
    </div>
   </>
  )
}
