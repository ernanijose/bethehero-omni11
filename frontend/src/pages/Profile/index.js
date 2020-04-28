import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const history = useHistory();
    
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    

    const [incidents, setIncidents] = useState([]);

    /*
    * a função useEffect tem dois parametros, o primeiro é a função, e o segundo
    * é quando esta função será executada, é um array de dependencias, quando o
    * array estiver vazio, significa que ele será executado apenas uma vez
    */
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);

    function handleDeleteIncident(id){
        try{
            api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }  
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao deletar o caso, tente novamente!');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <>
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Encontrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.div}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{ incident.description }</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}                
            </ul>
        </div>
        </>
    );
}