import React, {useState} from 'react'
import { Card } from 'react-bootstrap'
import {db} from '../firebase'
import { Link, useNavigate } from 'react-router-dom'

function Filter() {
const [selects, setSelects] = useState()
const [vacuna, setVacuna] = useState()
const [vDate, setDate] = useState()

const Vacunado = () => {
  
    db.collection("Users")
    .where("vacState", "==", selects)
    .get().then((querySnapshot) => {
            
      // Loop through the data and store
      // it in array to display
      querySnapshot.forEach(element => {
          var data = element.data();
          // setInfo(arr => [...arr , data]);
         window.alert(
          selects + "\nNombre: " + data.name + "\n" +
          "Email: " + data.mail 
          )
      });
  })
}


const Vacuna = () => {
  
  db.collection("Users")
  .where("vacTy", "==", vacuna)
  .get().then((querySnapshot) => {
          
    // Loop through the data and store
    // it in array to display
    querySnapshot.forEach(element => {
        var data = element.data();
        // setInfo(arr => [...arr , data]);
       window.alert(
       "Tipo de Vacuna \n" + vacuna + "\nNombre: " + data.name + "\n" +
        "Email: " + data.mail 
        )
    });
})
}

const Vdate = () => {
  
  db.collection("Users")
  .where("vacDate", "==", vDate)
  .get().then((querySnapshot) => {
          
    // Loop through the data and store
    // it in array to display
    querySnapshot.forEach(element => {
        var data = element.data();
       window.alert(
       "Año de Vacunación \n" + vDate + "\nNombre: " + data.name + "\n" +
        "Email: " + data.mail 
        )
    });
})
}


  return (
    <div>
      <Card>
        <Card.Body>
        
        <h3 className='text-center mb-4'>Filtros</h3><meta charSet='UTF-8' />
        <Card className='ml-4'>
          <p className='text-center'><strong>Estado de Vacunación</strong></p>
                <select className='mb-4 mt-2' id="select1" value={selects} onChange={e => setSelects(e.target.value)}>
                        <option className='mb-2' selected>Selecciona</option>
                        <option value="Vacunado">Vacunado</option>
                        <option value="No Vacunado">No Vacunado</option>
                 </select>
                 <button className='btn btn-primary w-100 mt-3' id='btn1' onClick={() => {Vacunado(); }} >Revisar</button>
          </Card>
        
          <Card className='mt-4'>
          <p className='text-center'><strong>Tipo de vacuna</strong></p>
          <select className='mb-4 mt-2' id="select2" value={vacuna} onChange={e => setVacuna(e.target.value)}>
                        <option className='mb-2' selected >Selecciona</option>
                        <option value="Sputnik">Sputnik</option>
                        <option value="AstraZeneca"  >AstraZeneca</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
            </select>
          <button className='btn btn-primary w-100 mt-3' id='btn2' onClick={() => {Vacuna() }} >Revisar</button>
          </Card>

          <Card className='mt-4'>
          <p className='text-center'><strong>Año de vacunación</strong></p>
          <select className='mb-4 mt-2' id="select2" value={vDate} onChange={e => setDate(e.target.value)}>
                        <option className='mb-2' selected >Selecciona</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
            </select>
          <button className='btn btn-primary w-100 mt-3' id='btn2' onClick={() => {Vdate() }} >Revisar</button>
          </Card>

        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
          <Link to={"/"}>Atrás</Link>
        </div>
    </div>
  )
}

export default Filter