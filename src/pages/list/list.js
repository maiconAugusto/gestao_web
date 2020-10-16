/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect} from 'react';
import {Container} from './style';
import SideMenu from '../../components/sideMenu/index';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast  } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../services/api';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lists from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import FakeAvatar from '../../assets/fake.png'
import { useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import Avatar from 'react-avatar';

export default function List () {
    let history = useHistory();
    let dispatch = useDispatch();

    useEffect(() => {
        GetCategories();
    }, [])
    const [lgShow, setLgShow] = useState(false);
    const [data, setData] = useState({collaborator: ''});
    const [categories, setCategories] = useState([]);
    const [list, setList] = useState([]);
    const [loading ,setLoading]= useState(false);
    const [loadingFilter, setLoadingFilter] = useState(false);
    let token = localStorage.getItem('@token')
    
    async function GetCategories () {
        setLoadingFilter(true);
        await api.get('/categories',{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
         .then((response) => {
             setCategories(response.data.data);
             let aux = [];
            response.data.data.map(element => {
                let obj = {
                    categories: element.categories,
                    id: element.id,
                    isSelect: true
                }
                aux.push(obj);
            });
            setCategories(aux);
            setLoadingFilter(false);
         })
         .catch(()=> {
            toast.error("Sua conexão expirou, faça o login novamente!")
            localStorage.removeItem('@email')
            localStorage.removeItem('@loginEmail')
            localStorage.removeItem('@token')
            setTimeout(()=> {
                history.push('/')
            },2000)
            setLoadingFilter(true);
         })
    }

    function selectCheck(id) {
        let aux = categories.map(element => {
            if (element.id === id) {
                element.isSelect = !element.isSelect;
            }
            return element;
        })
        setCategories(aux);
    }

    async function getList() {
        setList([])
        let aux = [];
        categories.map(element => {
            if (element.isSelect === true) {
                aux.push(element.id)
            }
        });

        if (aux.length === 0) {
            return toast.warning("Selecione uma categoria!")
        }
        setLoading(true);
        await api.get('/list-collaborators', {
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            params: {
                filter: aux
            }
        })
            .then((response)=> {
                if (response.data.data.length === 0) {
                    toast.warning("Não encontramos resultados")
                }
                console.log(response.data.data)
                let list = response.data.data;
                list.sort(function(a,b) {
                    return a.collaborator.name < b.collaborator.name ? -1 : a.collaborator.name > b.collaborator.name ? 1 : 0;
                });
                setList(list)
                dispatch({type: '@SETLIST', payload: list})
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

    function ViewUser () {
        return (
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => {
              setLgShow(false)
              setData({collaborator: ''})
            }}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title style={{fontSize: 14}} id="example-modal-sizes-title-lg">
              <Avatar size={60} round={true} src={data.collaborator.avatar === null ? FakeAvatar : data.collaborator.avatar} style={{marginRight: 4}} />
                {data ===  undefined? 'Não informado' : data.collaborator.name} 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}></div>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}></div>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <small>Cpf: {data.collaborator.cpf === '' ? 'Não informado' : data.collaborator.cpf}</small>
                    <small>Rg: {data.collaborator.rg === '' ? 'Não informado' : data.collaborator.rg}</small>
                    <br/>
                    <small>Idade: {data.collaborator.age === '' ? 'Não informado' : Math.floor(moment(new Date()).diff(moment(data.collaborator.age),'years',true))}</small>
                    <br/>
                    <small>Telefone: {data.collaborator.phone === '' ? 'Não informado' : data.collaborator.phone}</small>
                    <small>WhatsApp: {data.collaborator.whatsApp === '' ? 'Não informado' : data.collaborator.whatsApp}</small>
                    <br/>
                    <small>Bairro: {data.collaborator.neighborhood === '' ? 'Não informado' : data.collaborator.neighborhood}</small>
                    <small>Rua: {data.collaborator.street === '' ? 'Não informado' : data.collaborator.street}</small>
                    <small>Número: {data.collaborator.houseNumber === '' ? 'Não informado' : data.collaborator.houseNumber}</small>
                    <br/>
                    <small style={{textTransform: 'capitalize'}}>Colaborador: {data.categories}</small>
                    <small style={{textTransform: 'capitalize'}}>Descrição:</small>
                    <Form.Control value={data.collaborator.description === '' ? 'Não informado' : data.collaborator.description} style={{width: 700, fontSize: 12}} as="textarea" rows="5"  /> 
                    <br/>
                    <small>Facebook: {data.collaborator.facebook === '' ? 'Não informado' : (
                      <a target="_blank" href={data.collaborator.facebook}>click</a>
                    )}</small>
                    <small>Instagran: {data.collaborator.instagram === '' ? 'Não informado' : (
                      <a target="_blank" href={data.collaborator.instagram}>click</a>
                    )}</small>
                </div>
            </Modal.Body>
          </Modal>
        )
    }

    return (
        <Container>
             {ViewUser()}
             <div style={{height: '100vh', position: 'fixed', left: 0, top: 0}}>
               <SideMenu option={'list'} />
             </div>
            <div style={{display: "flex", alignItems: 'center', marginBottom: 30, justifyContent: 'center'}}>
                <FontAwesomeIcon style={{marginTop: 20}} icon={faList} />
                <strong style={{marginLeft: 10, marginTop: 20}}>LISTAGEM</strong>
            </div>
            <small style={{marginTop: 10, fontWeight: 600}}>Filtro:</small>
            <div style={{display: 'flex', justifyContent: 'space-around', width: 600 }}>
                {loadingFilter === true ? (
                    <div style={{paddingTop: 10, display: 'flex', alignItems: 'center'}}>
                        <Spinner size="sm" animation="border" variant="danger" />
                        <small style={{marginLeft: 8}}>Carregando...</small>
                    </div>
                ) : (
                    <div className="fx" style={{display: 'flex', height: 100, flexWrap: 'wrap'}}>
                        {categories.map(element => {
                        return (
                            <div class="border" style={{display: 'flex', flexDirection: 'row', height: 50, width: 150, alignItems: 'center', justifyContent: 'flex-start'}}>
                                <input type="checkbox" style={{marginLeft: 8}} onChange={()=> selectCheck(element.id)}  checked={element.isSelect} />
                                <label style={{ marginLeft: 8, marginTop: 8, fontSize: 13}}>{element.categories}</label>
                            </div>
                        )
                      })}
                    </div>
                )}
            </div>
            {loadingFilter === false ? (
                <div style={{width: 600, display: 'flex', justifyContent: 'flex-end'}}>
                  <Button style={{width: 150, marginTop: 10, fontSize: 14}} variant="success" onClick={(event)=> getList()}>Gerar lista</Button>
                </div>
            ) : null}
            {loading === true  ? (
                <div style={{paddingTop: 10, display: 'flex', alignItems: 'center'}}>
                    <Spinner animation="border" variant="danger" />
                    <small style={{marginLeft: 8}}>Carregando...</small>
                </div>
            ) : null}
            <Lists style={{width: 600}}>
                {list.map(element => {
                    return (
                        <div className="list fx">
                            <ListItem onClick={()=> {
                                setData(element)
                                setLgShow(true)
                            }} alignItems="flex-start">
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Avatar name={element.collaborator.name} size={60} round={true} src={element.collaborator.avatar === null ? FakeAvatar : element.collaborator.avatar} style={{marginRight: 4}} />
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                            style={{textTransform: 'capitalize', fontSize: 14}}
                                        >
                                            {element.collaborator.name}
                                        </Typography>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                            style={{textTransform: 'capitalize', fontSize: 12}}
                                        >
                                            {element.categories}
                                        </Typography>
                                    </div>
                                </div>
                            </ListItem>
                        </div>
                    )
                })}
            </Lists>
            <ToastContainer />
        </Container>
    )
}