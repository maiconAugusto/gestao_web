import React, {useEffect, useState} from 'react';
import SideMenu from '../../components/sideMenu/index'
import {Container, Div} from './style.js';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast  } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";


export default function Home () {
    let history = useHistory()
    let user  = JSON.parse(localStorage.getItem('@email'));
    const dispatch = useDispatch();
    let paciente = ''
    let contratado = ''
    let outros = ''
    let token = localStorage.getItem('@token')
    let contratadoRFCC = ''
    let voluntarioPolitica = ''
    let contratadoPolitica = ''
    let voluntarioRFCC = ''
    let voluntario = ''
    const [loading, setLoading] = useState(false);
    const [_total , settotal] = useState('');
    const [_pacinete, setPaciente] = useState('');
    const [_contratado, setContratado] = useState('');
    const [_outros, setOutros] = useState('');
    const [_voluntario, setVoluntario] = useState('')
    const [_contratadoPolitico, setContratadoPolitico] = useState('')
    const [_volunatarioPolitico, setVoluntarioPolitico] = useState('')
    const [_contratadoRFCC, setContratadoRFCC] = useState('')
    const [_volunatarioRFCC, setVoluntarioRFCC] = useState('')

    useEffect(()=> {
        getCategories();
    }, [])

    async function getCategories() {
        setLoading(true);
        await api.get('/categories', {
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        })
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
                    if (element.categories === 'Contratado RFCC') {
                        contratadoRFCC = element.id
                    }
                    if (element.categories === 'Contratado Política') {
                        contratadoPolitica = element.id
                    }
                    if (element.categories === 'Voluntário Política') {
                        voluntarioPolitica = element.id
                    }
                    if (element.categories === 'Voluntário RFCC') {
                        voluntarioRFCC = element.id
                    }
                    if (element.categories === 'Voluntário') {
                        voluntario = element.id
                    }
                    
                })
            getTotal();
            })
            .catch((error) => {
                setLoading(false);
                    toast.error("Sua conexão expirou, faça o login novamente!")
                    localStorage.removeItem('@email')
                    localStorage.removeItem('@loginEmail')
                    localStorage.removeItem('@token')
                    setTimeout(()=> {
                        dispatch({type: '@LOGIN', payload: null});
                        history.push('/')
                    },2000)
            })
    }
    async function getTotal () {
        await api.get('/total', {
            params: {
                paciente: paciente,
                contratado: contratado,
                outros: outros,
                voluntario: voluntario,
                voluntarioPolitica: voluntarioPolitica,
                voluntarioRFCC: voluntarioRFCC,
                contratadoPolitica: contratadoPolitica,
                contratadoRFCC: contratadoRFCC
            },
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((response)=> {
            settotal(response.data.data.total.count);
            setOutros(response.data.data.outro.count);
            setPaciente(response.data.data.pacientes.count);
            setContratado(response.data.data.contratados.count);
            setVoluntario(response.data.data.voluntarios.count);

            setContratadoPolitico(response.data.data.contratadoPoliticas.count)
            setContratadoRFCC(response.data.data.contratadoRFCCs.count)
            setVoluntarioRFCC(response.data.data.voluntarioRFCCs.count)
            setVoluntarioPolitico(response.data.data.voluntariosPoliticas.count)
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
                <small style={{marginRight: 6}}>Usuário: {user.name}</small>
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
                                        <Card.Title style={{fontSize: 14}}>Total de contratados(outros):</Card.Title>
                                        <Card.Text style={{fontSize: 14}}>
                                        Total: {_contratado}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="tag" style={{display: 'flex', marginBottom: 2}}>
                                <Card style={{ width: '18rem', margin:6 }}>
                                    <Card.Body>
                                        <Card.Title style={{fontSize: 14}}>Total de contratados políticos:</Card.Title>
                                        <Card.Text style={{fontSize: 14}}>
                                        Total: {_contratadoPolitico}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '18rem', margin:6  }}>
                                    <Card.Body>
                                        <Card.Title style={{fontSize: 14}}>Total de contratados RFCC:</Card.Title>
                                        <Card.Text style={{fontSize: 14}}>
                                        Total: {_contratadoRFCC}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="tag" style={{display: 'flex', marginBottom: 2}}>
                                <Card style={{ width: '18rem', margin:6 }}>
                                    <Card.Body>
                                        <Card.Title style={{fontSize: 14}}>Total de voluntários políticos:</Card.Title>
                                        <Card.Text style={{fontSize: 14}}>
                                        Total: {_volunatarioPolitico}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '18rem', margin:6  }}>
                                    <Card.Body>
                                        <Card.Title style={{fontSize: 14}}>Total de voluntários RFCC:</Card.Title>
                                        <Card.Text style={{fontSize: 14}}>
                                        Total: {_volunatarioRFCC}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="tag" style={{display: 'flex'}}>
                                <Card  style={{ width: '18rem', margin:6  }}>
                                    <Card.Body>
                                        <Card.Title style={{fontSize: 14}}>Total de voluntários(outros):</Card.Title>
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
                    <ToastContainer />
            </Container>
        </div>
    )
}