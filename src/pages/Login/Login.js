import React, {useState, useEffect} from 'react';
import {Container, ContainerForm} from './style';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';
import Image from 'react-bootstrap/Image';
import {useDispatch} from 'react-redux';
import Logo from '../../assets/gerenciamento-de-equipe.png';

export default function Login () {

    useEffect(() => {
        if (localStorage.getItem('@email') !== null){
            return history.push("/home");
        }
    }, []);

    const dispatch = useDispatch();
    let history = useHistory()
    const [email, setEmail] = useState(localStorage.getItem('@loginEmail') === null ? '' : localStorage.getItem('@loginEmail'));
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function send(event) {
        event.preventDefault()
        setLoading(true);
        if(email === '' || password === '') {
            setLoading(false);
            return toast.error("Informe todos os campos!")
        }
        await api.post('/authentication', {email: email, password: password})
        .then((response) => {
            setLoading(false);
            dispatch({type: '@LOGIN', payload: response.data.user});
            localStorage.setItem('@loginEmail', response.data.user.email)
            localStorage.setItem('@email', JSON.stringify(response.data.user))
            history.push("/home");
        })
        .catch((err)=> {
            setLoading(false);
            console.log(err)
            toast.error("Senha ou e-mail não está correto!")
        })
    }

    return (
        <Container>
            <ContainerForm>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Image style={{marginBottom: 20}} src={Logo} width={60} />
                </div>
                <input placeholder="E-mail" value={email} onChange={event => setEmail(event.target.value)} />
                <input placeholder="Senha" value={password} type="password" onChange={event => setPassword(event.target.value)} />
                {
                    loading === true ? (
                        <div style={{textAlign: 'center', paddingTop: 15}}>
                            <Spinner animation="border" variant="danger" />
                        </div>
                    ) : <button onClick={(event)=> send(event)}>Entrar</button>
                }
                <ToastContainer />
            </ContainerForm>
        </Container>
    );
}