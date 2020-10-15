import React, {useState} from 'react';
import SideMenu from '../../components/sideMenu/index';
import {Container} from './style.js'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import { useHistory } from "react-router-dom";

export default function Remove () {
    let history = useHistory()
    const [collaborators, setCollaborators] = useState([]);
    let token = localStorage.getItem('@token')
    async function GetCollaborators (name) {
        if (name === '') {
            return setCollaborators([]);
        }
        await api.get('/query', {
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            params: {
                name: name,
            }
        })
        .then((response) => {
            setCollaborators(response.data.data);
        })
        .catch((resp) => {
            toast.error("Sua conexão expirou, faça o login novamente!")
            localStorage.removeItem('@email')
            localStorage.removeItem('@loginEmail')
            localStorage.removeItem('@token')
            setTimeout(()=> {
                history.push('/')
            },2000)
        })
    }

    async function Remove (id) {
        await api.put(`/delete/${id}`)
        .then((response) => {
            toast.success(`${response.data.data}!`)
            const removeElement = collaborators.filter(element => {
                return element.collaborator.id !== id
            })
            setCollaborators(removeElement);
        })
        .catch(()=>{
            toast.warn('Ops, algo deu errado!')
        })
    }
    return (
        <div>
            <div style={{height: '100vh', position: 'fixed', left: 0, top: 0}}>
                <SideMenu option={'remove'} />
            </div>
            <Container>
              <div  style={{display: "flex", alignItems: 'center', marginBottom: 30}}>
                <FontAwesomeIcon icon={faUserTimes} />
                <strong style={{marginLeft: 10}}>REMOVER COLABORADOR</strong>
              </div>
                <input className="minor" type="text" style={{width: 400}} onChange={(event) => GetCollaborators(event.target.value)} placeholder="Nome" />
                <ul>
                    {collaborators.map(element => {
                        return(
                            <div key={element.id} style={{display: "flex", justifyContent: 'space-between', alignItems: 'center', marginTop: 16}}>
                                <li style={{width: 350}}>{element.collaborator.name}</li>
                                <IconButton aria-label="delete" onClick={() => Remove(element.collaborator.id)}>
                                    <DeleteIcon color="secondary"/>
                                </IconButton>
                            </div>
                        )
                    })}
                </ul>
                <ToastContainer />
            </Container>
        </div>
    )
}