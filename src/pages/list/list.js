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
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";

export default function List () {
    const dispatch = useDispatch();
    let history = useHistory()
    useEffect(() => {
        GetCategories();
    }, [])
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
                    toast.warning("Nao encontramos resultados")
                }
                setList(response.data.data)
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

    return (
        <Container>
            <SideMenu />
            <div style={{display: "flex", alignItems: 'center', marginBottom: 30, justifyContent: 'center'}}>
                <FontAwesomeIcon style={{marginTop: 20}} icon={faList} />
                <strong style={{marginLeft: 10, marginTop: 20}}>LISTAGEM</strong>
            </div>
            <small style={{marginTop: 10, fontWeight: 600}}>Filtro:</small>
            <div style={{display: 'flex', justifyContent: 'space-around', width: 400 }}>
                {loadingFilter === true ? (
                    <div style={{paddingTop: 10, display: 'flex', alignItems: 'center'}}>
                        <Spinner size="sm" animation="border" variant="danger" />
                        <small style={{marginLeft: 8}}>Carregando...</small>
                    </div>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {categories.map(element => {
                        return (
                        <div style={{display: 'flex', flexDirection: 'row', height: 50, width: 110, alignItems: 'center'}}>
                            <input type="checkbox" id="scales" onChange={()=> selectCheck(element.id)}  checked={element.isSelect} />
                            <label style={{ marginLeft: 8, marginTop: 8, fontSize: 14}}>{element.categories}</label>
                        </div>
                        )
                      })}
                    </div>
                )}
            </div>
            {loading === true  ? (
                <div style={{paddingTop: 10, display: 'flex', alignItems: 'center'}}>
                    <Spinner animation="border" variant="danger" />
                    <small style={{marginLeft: 8}}>Carregando...</small>
                </div>
            ) : (
                <Button style={{width: 400, marginTop: 10}} variant="success" onClick={(event)=> getList()}>Gerar lista</Button>
            )}
            <Lists style={{width: 400}}>
                {list.map(element => {
                    return (
                        <div className="list">
                        <ListItem  alignItems="flex-start">
                            <ListItemText
                            primary={element.collaborator.name}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {element.categories}
                                </Typography>
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                        </div>
                    )
                })}
            </Lists>
            <ToastContainer />
        </Container>
    )
}