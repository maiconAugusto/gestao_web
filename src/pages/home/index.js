import React, {useEffect, useState} from 'react';
import SideMenu from '../../components/sideMenu/index'
import {Container, Div} from './style.js';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';

export default function Home () {

    let user  = JSON.parse(localStorage.getItem('@email'));

    let paciente = ''
    let contratado = ''
    let outros = ''
    let voluntario = ''

    const [loading, setLoading] = useState(false);
    const [_total , settotal] = useState('');
    const [_pacinete, setPaciente] = useState('');
    const [_contratado, setContratado] = useState('');
    const [_outros, setOutros] = useState('');
    const [_voluntario, setVoluntario] = useState('');

    useEffect(()=> {
        getCategories();
    }, [])

    async function getCategories() {
        setLoading(true);
        await api.get('/categories')
            .then((response)=> {
                let aux = response.data.data;
                aux.map(element => {
                    if (element.categories === 'Paciente') {
                        paciente = element.id;
                    }
                    if (element.categories === 'Contratado') {
                        contratado = element.id;
                    }
                    if (element.categories === 'Outros') {
                        outros = element.id;
                    }
                    if (element.categories === 'Voluntário') {
                        voluntario = element.id;
                    }
                })
            getTotal();
            })
            .catch(() => {
                setLoading(false);
            })
    }
    async function getTotal () {
        await api.get('/total', {
            params: {
                paciente: paciente,
                contratado: contratado,
                outros: outros,
                voluntario: voluntario
            }
        })
        .then((response)=> {
            settotal(response.data.data.total.count);
            setOutros(response.data.data.outro.count);
            setPaciente(response.data.data.pacientes.count);
            setContratado(response.data.data.contratados.count);
            setVoluntario(response.data.data.voluntarios.count);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
        })
    }
    return (
        <div> 
            <SideMenu option={'home'} />
            <div style={{display: 'flex' , justifyContent: 'flex-end', padding: 8}}>
                <FontAwesomeIcon style={{marginRight: 4}} icon={faUser} />
                <small style={{marginRight: 6}}>Usúario: {user.name}</small>
            </div>
            <Container>
                    {loading === true ? (
                        <div style={{paddingTop: 50, display: 'flex', alignItems: 'center'}}>
                            <Spinner animation="border" variant="danger" />
                            <small style={{marginLeft: 8}}>Carregando...</small>
                        </div>
                    ) : (
                        <Div>
                            <div className="tag" style={{display: 'flex', marginBottom: 2}}>
                                <Card style={{ width: '18rem', margin:6 }}>
                                    <Card.Body>
                                        <Card.Title style={{fontSize: 14}}>Total de colaboradores:</Card.Title>
                                        <Card.Text style={{fontSize: 14}}>
                                        Total: {_total}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '18rem', margin:6  }}>
                                    <Card.Body>
                                        <Card.Title style={{fontSize: 14}}>Total de contratados:</Card.Title>
                                        <Card.Text style={{fontSize: 14}}>
                                        Total: {_contratado}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="tag" style={{display: 'flex'}}>
                                <Card style={{ width: '18rem', margin:6  }}>
                                    <Card.Body>
                                        <Card.Title style={{fontSize: 14}}>Total de voluntários:</Card.Title>
                                        <Card.Text style={{fontSize: 14}}>
                                        Total: {_voluntario}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '18rem', margin:6  }}>
                                    <Card.Body>
                                        <Card.Title style={{fontSize: 14}}>Total de pacientes:</Card.Title>
                                        <Card.Text style={{fontSize: 14}}>
                                        Total: {_pacinete}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="tag" style={{display: 'flex'}}>
                                <Card style={{ width: '18rem', margin:6  }}>
                                    <Card.Body>
                                        <Card.Title style={{fontSize: 14}}>Outros:</Card.Title>
                                        <Card.Text style={{fontSize: 14}}>
                                        Total: {_outros}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Div>
                    )}
            </Container>
        </div>
    )
}