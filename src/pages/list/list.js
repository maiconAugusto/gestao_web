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

export default function List () {
    useEffect(() => {
        GetCategories();
    }, [])
    const [categories, setCategories] = useState([]);
    const [list, setList] = useState([]);
    const [loading ,setLoading]= useState(false);
    const [loadingFilter, setLoadingFilter] = useState(false);
    
    async function GetCategories () {
        setLoadingFilter(true);
        await api.get('/categories')
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
            params: {
                filter: aux
            }
        })
            .then((response)=> {
                setList(response.data.data)
                setLoading(false)
            })
            .catch(()=> {
                toast.warn("Algo deu errado, tente novamente")
                setLoading(false)
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
                    categories.map(element => {
                        return (
                        <div style={{display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" id="scales" onChange={()=> selectCheck(element.id)}  checked={element.isSelect} />
                            <label style={{paddingTop: 10, marginLeft: 4}}>{element.categories}</label>
                        </div>
                        )
                    })
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