import React, {useState} from 'react';
import {Container, ContainerForm} from './style.js';
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideMenu from '../../components/sideMenu/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';


export default function Avanced () {

    const [email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [ name, setName] = useState('');

    async function send(event){
        event.preventDefault()
        if (name === ''){
            toast.warning("Nome é obrigatório")
        }
        if (email === ''){
            toast.warning("E-mail é obrigatório")
        }
        if (password === ''){
            toast.warning("Senha é obrigatório")
        }
        if (name === '' || email === '' || password === ''){
            return;
        }
        setLoading(true);
        await api.post('/register', {
            name: name,
            email: email,
            password: password
        })
        .then(()=> {
            toast.success("Salvo com sucesso!")
            setLoading(false)
            setName('')
            setEmail('')
            setPassword('')
        })
        .catch(()=>{
            toast.warn("E-mail ja cadastrado!")
            setLoading(false)
        })
    }

    function handleRegister() {
        return (
            <>
                <div style={{display: "flex", alignItems: 'center', marginBottom: 30, justifyContent: 'center'}}>
                  <FontAwesomeIcon style={{marginTop: 20}} icon={faKey} />
                <strong style={{marginLeft: 10, marginTop: 20}}>ADICIONAR USUÁRIO</strong>
                </div>
                <ContainerForm>
                    <input placeholder="Nome completo" value={name} type="text" onChange={event => setName(event.target.value)} />
                    <input placeholder="E-mail" value={email} type="text" onChange={event => setEmail(event.target.value)} />
                    <input placeholder="Senha" value={password} type="password" onChange={event => setPassword(event.target.value)} />
                    {
                        loading === true ? (
                            <div style={{textAlign: 'center', paddingTop: 15}}>
                                <Spinner animation="border" variant="danger" />
                            </div>
                        ) : <button onClick={(event)=> send(event)}>Salvar</button>
                    }
                </ContainerForm>
            </>
        )
    }

    return (
        <Container>
        <SideMenu option={'avanced'}/>
        {handleRegister()}
        <ToastContainer />
      </Container>
    )
}
