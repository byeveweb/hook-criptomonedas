import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import Axios from 'axios';


import useMoneda from './../hooks/useMoneda'
import useCriptomoneda from './../hooks/useCriptomoneda'
import Error from './../error/Error'

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = ({ setMoneda, setCriptomoneda }) => {

    //state del listado de criptomonedas
    const [listadocripto, setListCript] = useState([])

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar EEUU' },
        { codigo: 'MXN', nombre: 'Peso mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ]

    //Utilizamos el useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS)

    //Utiliza useCryptonomeda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu critomoneda', '', listadocripto)

    //State error
    const [error, guardarError] = useState(false)

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await Axios.get(url);
            setListCript(resultado.data.Data)
        }

        consultarApi()

    }, [])

    const cotizarMoneda = e => {
        e.preventDefault()

        //Validar
        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return
        }

        guardarError(false)

        //Pasar los datos paar el principal

        setMoneda(moneda)
        setCriptomoneda(criptomoneda)

    }


    return (

        <form
            onSubmit={cotizarMoneda}>
            {error ? <Error mensaje="rellena todos los campos" /> : null}
            <SelectMonedas />
            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />

        </form>
    );
}

Formulario.propTypes = {
    setMoneda: PropTypes.func.isRequired,
    setCriptomoneda: PropTypes.func.isRequired

}
export default Formulario;