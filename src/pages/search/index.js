import React, {useState, useEffect} from 'react';
import SideMenu from '../../components/sideMenu/index';
import {Container} from './style.js'
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form'
import 'moment/locale/pt-br'
import { ToastContainer, toast  } from 'react-toastify';
import InputMask from "react-input-mask";
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";

export default function Search () {
    const dispatch = useDispatch();
    let history = useHistory()
    const [lgShow, setLgShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [data, setData] = useState({collaborator: ''});
    const [collaborators, setCollaborators] = useState([]);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [whatsApp, setWhatsApp] = useState('');
    const [phone, setPhone] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber ] = useState('');
    const [complement, setComplement] = useState('');
    const [description, setDescription] = useState('');
    const [reference, setReference] = useState('');
    const [idCategories, setIdCategories] = useState('');
    const [city, setCity] = useState('Ponta Porã');
    const [state, setSate] = useState('MS');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [loading, setLoading] = useState(false);
    let token = localStorage.getItem('@token')
    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        getCategories();
    }, [])

    async function getCategories() {
        await api.get('/categories', {
          headers:{
            'Authorization': `Bearer ${token}`,
          },
        })
            .then((response)=> {
                setCategories(response.data.data);
            })
            .catch(()=> {
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
      setLoading(true)
      await api.put(`/update-collaborators/${data.collaborator.id}`, {
        name,
        age,
        rg,
        cpf,
        whatsApp,
        phone,
        neighborhood,
        street,
        houseNumber,
        complement,
        description,
        reference,
        idCategories,
        city,
        state,
        facebook,
        instagram,
      })
      .then((r) => {
        setLoading(false)
        setEditShow(false)
        setCollaborators([]);
        toast.success("Atualizado com sucesso!")
      })
      .catch((f)=> {
        setLoading(false);
        console.log(f.data)
        toast.error("Algo deu errado, tente novamente!")
      })
    }
    function setEdit(){
      setName(data.collaborator.name)
      setAge(data.collaborator.age)
      setRg(data.collaborator.cpf)
      setCpf(data.collaborator.cpf)
      setWhatsApp(data.collaborator.whatsApp)
      setPhone(data.collaborator.phone)
      setNeighborhood(data.collaborator.neighborhood)
      setStreet(data.collaborator.street)
      setHouseNumber(data.collaborator.houseNumber)
      setComplement(data.collaborator.complement)
      setDescription(data.collaborator.description)
      setReference(data.collaborator.reference)
      setIdCategories(data.collaborator.idCategories)
      setFacebook(data.collaborator.facebook)
      setInstagram(data.collaborator.instagram)
      setEditShow(true)
      setLgShow(false)
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
                {data ===  undefined? 'Não informado' : data.collaborator.name} 
                <IconButton style={{marginLeft: 6}}  aria-label="delete" onClick={() =>  {
                  setEdit()
                }}>
                    <Edit color="secondary"/>
                </IconButton>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: 'flex', flexDirection: 'column'}}>
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
                    <small>Descrição: {data.collaborator.description === '' ? 'Não informado' : data.collaborator.description}</small>
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
    function EditaUser () {
      return (
        <Modal
          size="xl"
          show={editShow}
          onHide={() => {
            setEditShow(false)
            setData({collaborator: ''})
          }}
          aria-labelledby="example-modal-sizes-title-lg"
          >
            {loading === true ? (
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300}}>
                <Spinner animation="border" variant="danger" />
                <small style={{marginLeft: 8}}>Salvando...</small>
              </div>
            ) : (
            <Container>
              <Form className="tag">
                <Form.Row>
                    <Form.Group style={{padding: 5}} controlId="formGridEmail">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Nome</Form.Label>
                            <Form.Control value={name} style={{width: 300}} type="text" placeholder="Nome completo" onChange={event => setName(event.target.value)} />
                        </div>
                    </Form.Group>

                    <Form.Group style={{padding: 5}} controlId="formGridPassword">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Data de nascimento</Form.Label>
                            <Form.Control value={age} style={{width: 300}} type="date" placeholder="Data de nascimento" onChange={event => setAge(event.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group style={{padding: 5}} controlId="formGridEmail">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>RG</Form.Label>
                            <InputMask value={rg} style={{width: 300}} mask="99.999.999-9" placeholder="RG" onChange={event => setRg(event.target.value)} />
                        </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group style={{padding: 5}} controlId="formGridPassword">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>CPF</Form.Label>
                            <InputMask value={cpf}  style={{width: 300}} mask="999.999.999-99" placeholder="CPF" onChange={event => setCpf(event.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group style={{padding: 5}} controlId="formGridEmail">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Telefone fixo</Form.Label>
                            <InputMask value={phone} style={{width: 300}} mask="(99) 9999-9999" placeholder="Telefone" onChange={event => setPhone(event.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group style={{padding: 5}} controlId="formGridPassword">
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Celular (WhatsApp)</Form.Label>
                        <InputMask value={whatsApp} style={{width: 300}} mask="(99) 99999-9999" placeholder="WhatsApp" onChange={event => setWhatsApp(event.target.value)} />
                    </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group style={{padding: 5}} controlId="formGridPassword">
                        <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Bairro</Form.Label>
                        <Form.Control value={neighborhood} style={{width: 300}} type="text" placeholder="Bairro" onChange={event => setNeighborhood(event.target.value)} />
                    </Form.Group>
                    <Form.Group style={{padding: 5}} controlId="formGridEmail">
                        <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Rua</Form.Label>
                        <Form.Control value={street} style={{width: 300}} type="tel" placeholder="Rua" onChange={event => setStreet(event.target.value)} />
                    </Form.Group>

                    <Form.Group style={{padding: 5}} controlId="formGridPassword">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Número</Form.Label>
                            <Form.Control value={houseNumber} style={{width: 300}} type="text" placeholder="Número da casa" onChange={event => setHouseNumber(event.target.value)} />
                        </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group style={{padding: 5}} controlId="formGridEmail">
                    <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Complemento</Form.Label>
                        <Form.Control value={complement} style={{width: 300}} type="text" placeholder="Complemento" onChange={event => setComplement(event.target.value)} />
                    </Form.Group>
                    <Form.Group style={{padding: 5}} controlId="formGridPassword">
                        <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Referência</Form.Label>
                        <Form.Control value={reference} style={{width: 300}} type="text" placeholder="Referência" onChange={event => setReference(event.target.value)} />
                    </Form.Group>
                    <Form.Group style={{padding: 5}} controlId="formGridState">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Categoria</Form.Label>
                            <form onChangeCapture={(event) => setIdCategories(event.target.value)}>
                                <select style={{width: 300, height: 34, marginTop: 12}}>
                                <option value="" style={{textTransform: 'lowercase'}}>Selecione</option>
                                    {categories.map(element => {
                                        return (
                                            <>
                                            <option value={element.id} style={{textTransform: 'lowercase'}}>{element.categories}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </form>
                        </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group style={{padding: 5}} controlId="formGridEmail">
                        <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>FaceBook</Form.Label>
                        <Form.Control value={facebook} style={{width: 300}} type="url" placeholder="Link" onChange={event => setFacebook(event.target.value)} />
                    </Form.Group>

                    <Form.Group style={{padding: 5}} controlId="formGridPassword">
                        <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Instagran</Form.Label>
                        <Form.Control value={instagram} style={{width: 300}} type="url" placeholder="Link" onChange={event => setInstagram(event.target.value)} />
                    </Form.Group>
                    <Form.Group style={{padding: 5}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="none" style={{fontSize: 14}}>Descrição</Form.Label>
                        <Form.Control value={description} style={{width: 300}} style={{width: 300}} as="textarea" rows="2" onChange={event => setDescription(event.target.value)} />
                    </Form.Group>
                </Form.Row>
                <Button style={{marginTop: -16, marginBottom: 20}} onClick={()=> sendApi()} variant="success" >
                    Salvar
                </Button>
              </Form>
          </Container>
            )}
        </Modal>
      )
    }
    return (
        <div>
            <SideMenu option={'search'} />
            {ViewUser()}
            {EditaUser()}
            <Container >
              <div className="tag">
              <div style={{display: "flex", alignItems: 'center', marginBottom: 30, justifyContent: 'center'}}>
                <FontAwesomeIcon icon={faSearch} />
                <strong style={{marginLeft: 10}}>PROCURAR COLABORADOR</strong>
              </div>
                <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                    <input placeholder="Nome" onChange={(event) => GetCollaborators(event.target.value)} />   
                </div>
                <ListGroup style={{width: 400, marginTop: 20}}>
                    {collaborators.map(element => {
                      return (
                        <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                          <ListGroup.Item style={{width: 400, fontSize: 14}}  onClick={()=> {
                            setLgShow(true)
                            setData(element)
                          }}>
                            {element.collaborator.name}
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