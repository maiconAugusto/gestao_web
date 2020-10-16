/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect} from 'react';
import {Container} from './style';
import SideMenu from '../../components/sideMenu/index';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast  } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../services/api';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lists from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import FakeAvatar from '../../assets/fake.png'
import { useHistory } from "react-router-dom";
import Avatar from 'react-avatar';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ListPayment () {
    let history = useHistory();

    const [list, setList] = useState([]);
    const [loading ,setLoading]= useState(false);

    let token = localStorage.getItem('@token')
    
    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        setLoading(true);
        await api.get('/all-payment', {
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response)=> {
                if (response.data.data.length === 0) {
                    toast.warning("Não encontramos resultados")
                }
                let list = response.data.data;
                list.sort(function(a,b) {
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                });
                setList(list)
                setLoading(false)
            })
            .catch((resp)=> {
                setLoading(false);
                toast.error("Sua conexão expirou, faça o login novamente!")
                localStorage.removeItem('@email')
                localStorage.removeItem('@loginEmail')
                localStorage.removeItem('@token')
                setTimeout(()=> {
                    history.push('/')
                },2000)
            })
    }

    function handleDate(data) {
        const newData = data.split('-')
        return `${newData[2]}/${newData[1]}/${newData[0]}`
    }

    async function removePayment (id) {
        const response = await api.put(`/delete-payment/${id}`)
        if (response.status === 200) {
            toast.success(`${response.data.data}`)
            getList()
        }
    }

    return (
        <Container>
             <div style={{height: '100vh', position: 'fixed', left: 0, top: 0}}>
               <SideMenu option={'list-payment'} />
             </div>
            <div style={{display: "flex", alignItems: 'center', marginBottom: 30, justifyContent: 'center'}}>
                <FontAwesomeIcon style={{marginTop: 20}} icon={faList} />
                <strong style={{marginLeft: 10, marginTop: 20}}>LISTAGEM DE PAGAMENTOS REGISTRADOS</strong>
            </div>
            {loading ? (
                <div style={{paddingTop: 10, display: 'flex', alignItems: 'center'}}>
                    <Spinner animation="border" variant="danger" />
                    <small style={{marginLeft: 8}}>Carregando...</small>
                </div>
            ) : (
                <Lists style={{width: 600}}>
                {list.map(element => {
                    return (
                        <div className="list">
                        <ListItem alignItems="flex-start">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '60%'}}>
                                    <Avatar name={element.name} size={60} round={true} src={element.avatar === null ? FakeAvatar : element.avatar} style={{marginRight: 4}} />
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                            style={{textTransform: 'capitalize', fontSize: 14}}>
                                            {element.name}
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', width: '40%', alignItems: 'flex-end'}}>
                                    {element.payments.map(el => {
                                        return (
                                            <div style={{display: 'row', justifyContent: 'space-around'}}>
                                                <small style={{marginRight: 10}}>Data: {handleDate(el.date)}</small>
                                                <small>Valor: {el.price}</small>
                                                <DeleteIcon style={{height: 18, marginBottom: 4, marginLeft: 5}} color="secondary" onClick={()=> removePayment(el.id)} />
                                            </div>
                                        )
                                    })}
                                    <small style={{fontWeight: 'bold', marginTop: 10, color: '#216B0C', marginRight: 6}}>Valor Total: {element.payments.reduce(function (acumulador, valorAtual) {
                                        return acumulador + parseFloat(valorAtual.price);
                                    },0).toFixed(2)}</small>
                                </div>
                            </div>
                        </ListItem>
                        </div>
                    )
                })}
            </Lists>
            )}
            <ToastContainer />
        </Container>
    )
}