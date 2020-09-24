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

export default function Remove () {
    const [collaborators, setCollaborators] = useState([]);

    async function GetCollaborators (name) {
        if (name === '') {
            return setCollaborators([]);
        }
        await api.get('/query', {
            params: {
                name: name,
            }
        })
        .then((response) => {
            setCollaborators(response.data.data);
        })
    }

    async function Remove (id) {
        await api.put(`/delete/${id}`)
        .then((response) => {
            toast.success(`${response.data.data}!`)
            const removeElement = collaborators.filter(element => {
                return element.id !== id
            })
            setCollaborators(removeElement);
        })
        .catch(()=>{
            toast.warn('Ops, algo deu errado!')
        })
    }
    return (
        <div>
            <SideMenu option={'remove'} />
            <Container>
              <div  style={{display: "flex", alignItems: 'center', marginBottom: 30}}>
                <FontAwesomeIcon icon={faUserTimes} />
                <strong style={{marginLeft: 10}}>REMOVER COLABORADOR</strong>
              </div>
                <input type="text" style={{width: 400}} onChange={(event) => GetCollaborators(event.target.value)} placeholder="Nome" />
                <ul>
                    {collaborators.map(element => {
                        return(
                            <div key={element.id} style={{display: "flex", justifyContent: 'space-between', alignItems: 'center', marginTop: 16}}>
                                <li style={{width: 350}}>{element.name}</li>
                                <IconButton aria-label="delete" onClick={() => Remove(element.id)}>
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