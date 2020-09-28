import React, {useState} from 'react'
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ContainerForm, Container} from './style.js'
import SideMenu from '../../components/sideMenu/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';

export default function Password () {
    let user  = JSON.parse(localStorage.getItem('@email'));
    const [password, setPassword] = useState('')
    const [comfirPassword, setComfirPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function send(event) {
     event.preventDefault()
     setLoading(true);
     if (password !== comfirPassword) {
        setLoading(false);
        return toast.error("As senhas são diferentes!")
     }
     if (password === '' || comfirPassword === '') {
        setLoading(false);
        return toast.error("Informe a senha!")
     }
    await api.put(`/update-password/${user.id}`, {
        password: password
    })
    .then(()=> {
        setLoading(false);
        setPassword('');
        setComfirPassword('');
        toast.success("Atualizado com sucesso!")
    })
    .catch(() => {
        setLoading(false);
        toast.error("Algo deu errado, tente novamente!")
    })
    }
    return (
        <Container>
          <SideMenu option={'password'}/>
          <div style={{display: "flex", alignItems: 'center', marginBottom: 30}}>
            <FontAwesomeIcon icon={faKey} />
          <strong style={{marginLeft: 10}}>ALTERAR SENHA</strong>
          </div>
          <ContainerForm>
              <input placeholder="Nova senha" value={password} type="password" onChange={event => setPassword(event.target.value)} />
              <input placeholder="Comfirmar nova senha" value={comfirPassword} type="password" onChange={event => setComfirPassword(event.target.value)} />
                {
                    loading === true ? (
                        <div style={{textAlign: 'center', paddingTop: 15}}>
                            <Spinner animation="border" variant="danger" />
                        </div>
                    ) : <button onClick={(event)=> send(event)}>Salvar</button>
                }
          </ContainerForm>
          <ToastContainer />
        </Container>
    )
}