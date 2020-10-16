import React, {useState,} from 'react';
import SideMenu from '../../components/sideMenu/index';
import {Container} from './style.js'
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form'
import 'moment/locale/pt-br'
import { ToastContainer, toast  } from 'react-toastify';
import CurrencyInput from 'react-currency-masked-input'
import { useHistory } from "react-router-dom";
import FakeAvatar from '../../assets/fake.png'
import Avatar from 'react-avatar';
import Typography from '@material-ui/core/Typography';

export default function Payment () {
    let history = useHistory()
    const [lgShow, setLgShow] = useState(false);
    const [data, setData] = useState({collaborator: ''});
    const [collaborators, setCollaborators] = useState([]);

    const [price, setPrice] = useState('')
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false);
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
        console.log(response.data.data)
          setCollaborators(response.data.data);
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
    async function sendApi(){
      if (price === '') {
        toast.warn("Ops, Valor é obrigatório!");
        setLoading(false)
      }
      if (date === '') {
        toast.warn("Ops, Data é obrigatório!");
        setLoading(false)
        return
      }
      setLoading(true)
      api.post('/payment', {date, price, id: data.collaborator.id})
        .then(() => {
          setLoading(false)
          setDate('')
          setPrice('')
          toast.success("Adicionado com sucesso!");
        })
        .catch(()=> {
          toast.error("Ops, Algo deu errado!, notifique o suporte para resolver o problema!");
          setDate(null)
          setPrice(null)
          setLoading(false)
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
              <Modal.Title style={{fontSize: 14, textTransform: 'capitalize'}} id="example-modal-sizes-title-lg">
              <Avatar name={data.collaborator.name} size={60} round={true} src={data.collaborator.avatar === null ? FakeAvatar : data.collaborator.avatar} style={{marginRight: 4}} />
                {data ===  undefined? 'Não informado' : data.collaborator.name} 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <small style={{textTransform: 'capitalize', marginBottom: 20, marginLeft: 30}}>Colaborador: {data.categories}</small>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'column', marginTop: 30}}>
                      <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Data</Form.Label>
                      <Form.Control type="date" style={{width: 200}} value={date} placeholder="Data do pagamento" onChange={event => setDate(event.target.value)} />
                      <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Valor</Form.Label>
                      <CurrencyInput placeholder="Valor" value={price} style={{width: 200, marginTop: 2}} onChange={(event, props)=> setPrice(props)} />
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  {loading ? (
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginRight: 30}}>
                      <Spinner animation="border" variant="danger" />
                      <small style={{marginLeft: 8}}>Salvando...</small>
                    </div>
                  ) : (
                    <div>
                      <Button style={{marginTop: 20, marginRight: 10, fontSize: 14}} onClick={()=> sendApi()} variant="success" >
                        Salvar
                      </Button>
                      <Button style={{marginTop: 20, marginRight: 10, fontSize: 14}} onClick={()=> {
                        setLgShow(false)
                        setData({collaborator: ''})
                      }} variant="outline-danger" >
                        Fechar
                      </Button>
                    </div>
                  )}
                </div>
            </Modal.Body>
          </Modal>
        )
    }
    
    return (
        <div>
            <div style={{height: '100vh', position: 'fixed', left: 0, top: 0}}>
              <SideMenu option={'payment'} />
             </div>
            {ViewUser()}
            <Container >
              <div className="tag">
              <div style={{display: "flex", alignItems: 'center', marginBottom: 30, justifyContent: 'center'}}>
                <FontAwesomeIcon icon={faSearch} />
                <strong style={{marginLeft: 10}}>SELECIONE O COLABORADOR</strong>
              </div>
                <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                    <input placeholder="Nome" onChange={(event) => GetCollaborators(event.target.value)} />   
                </div>
                <ListGroup style={{width: 400, marginTop: 20}}>
                    {collaborators.map(element => {
                      return (
                        <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                          <ListGroup.Item style={{width: 400, fontSize: 14, textTransform: 'capitalize'}}  onClick={()=> {
                            setLgShow(true)
                            setData(element)
                          }}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <Avatar name={element.collaborator.name} size={50} round={true} src={element.collaborator.avatar === null ? FakeAvatar : element.collaborator.avatar} style={{marginRight: 4}} />
                              <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                    style={{textTransform: 'capitalize', fontSize: 14}}>
                                    {element.collaborator.name}
                                </Typography>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                    style={{textTransform: 'capitalize', fontSize: 12}}>
                                    {element.categories}
                                </Typography>
                              </div>
                            </div>
                          </ListGroup.Item>
                        </div>
                      )
                    })}
                </ListGroup>
              </div>
              <ToastContainer />
            </Container>
        </div>
    )
}