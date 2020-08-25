import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Axios from 'axios';

import './App.css';
import imagen from './cryptomonedas.png';
import Spinner from './spinner/Spinner'


import Formulario from './cotizacion/Formulario'
import Cotizacion from './cotizacion/Cotizacion'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;


function App() {

  const [moneda, setMoneda] = useState('')
  const [criptomoneda, setCriptomoneda] = useState('')

  //resultado cotización
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {

    //consultamos la api para la info
    const consultarApi = async () => {
      //Validamos la primera vez
      if (moneda === '') return
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await Axios.get(url);


      //mostrar Spinner
      setCargando(true)

      //oculatar Spinner
      setTimeout(() => {
        setCargando(false)
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda])
      }, 3000)

    }

    consultarApi()

  }, [moneda, criptomoneda])




  //Mostra spinner o resultado
  const component = (cargando) ? <Spinner /> : <Cotizacion
    resultado={resultado} />




  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda} />
        {component}



      </div>
    </Contenedor>
  );
}

export default App;
