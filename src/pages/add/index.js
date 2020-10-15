import React, {useState, useEffect} from 'react';
import SideMenu from '../../components/sideMenu/index';
import {Container} from './style.js'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast  } from 'react-toastify';
import InputMask from "react-input-mask";
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";


export default function Add () {
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    let history = useHistory()
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
            .catch((resp) => {
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

    async function sendToApi () {
        if (name === '') {
            return toast.error("O campo nome é obrigatório!")
        }
        if (idCategories === '') {
            return toast.error("O campo categoria é obrigatório!")
        }

        setLoading(true);
        await api.post('/createcollaborators', {
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
        .then(() => {
            toast.success("Adicionado com sucesso!");
            setLoading(false);
            setName('')
            setAge('')
            setRg('')
            setCpf('')
            setWhatsApp('')
            setPhone('')
            setNeighborhood('')
            setStreet('')
            setHouseNumber('')
            setComplement('')
            setDescription('')
            setReference('')
            setIdCategories('')
            setFacebook('')
            setInstagram('')
        })
        .catch((error) => { 
            toast.error("Ops, Algo deu errado!, notifique o suporte para resolver o problema!");
            setLoading(false);
            setName('')
            setAge('')
            setRg('')
            setCpf('')
            setWhatsApp('')
            setPhone('')
            setNeighborhood('')
            setStreet('')
            setHouseNumber('')
            setComplement('')
            setDescription('')
            setReference('')
            setIdCategories('')
            setFacebook('')
            setInstagram('')
        })
    }

    function handleDescription(event) {
        setDescription(event.target.value)
    }

    return (
        <div>
            <SideMenu option={'add'}/>
            <Container>
              {loading === true ? 
                <div style={{paddingTop: 50, display: 'flex', alignItems: 'center'}}>
                    <Spinner animation="border" variant="danger" />
                    <small style={{marginLeft: 8}}>Salvando...</small>
                </div>
              : (
                <>
                    <div style={{display: "flex", alignItems: 'center', marginBottom: 30}}>
                        <FontAwesomeIcon icon={faUserPlus} />
                    <strong style={{marginLeft: 10}}>ADICIONAR COLABORADOR</strong>
                    </div>
                    <Form className="tag">
                    <Form.Row>
                        <Form.Group style={{padding: 5}} controlId="formGridEmail">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Nome completo" onChange={event => setName(event.target.value)} />
                            </div>
                        </Form.Group>
    
                        <Form.Group style={{padding: 5}} controlId="formGridPassword">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Data de nascimento</Form.Label>
                                <Form.Control type="date" placeholder="Data de nascimento" onChange={event => setAge(event.target.value)} />
                            </div>
                        </Form.Group>
                        <Form.Group style={{padding: 5}} controlId="formGridEmail">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>RG</Form.Label>
                                <InputMask placeholder="RG" onChange={event => setRg(event.target.value)} />
                            </div>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group style={{padding: 5}} controlId="formGridPassword">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>CPF</Form.Label>
                                <InputMask mask="999.999.999-99" placeholder="CPF" onChange={event => setCpf(event.target.value)} />
                            </div>
                        </Form.Group>
                        <Form.Group style={{padding: 5}} controlId="formGridEmail">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Telefone fixo</Form.Label>
                                <InputMask mask="(99) 9999-9999" placeholder="Telefone" onChange={event => setPhone(event.target.value)} />
                            </div>
                        </Form.Group>
                        <Form.Group style={{padding: 5}} controlId="formGridPassword">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Celular (WhatsApp)</Form.Label>
                            <InputMask mask="(99) 99999-9999" placeholder="WhatsApp" onChange={event => setWhatsApp(event.target.value)} />
                        </div>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group style={{padding: 5}} controlId="formGridPassword">
                            <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Bairro</Form.Label>
                            <Form.Control type="text" placeholder="Bairro" onChange={event => setNeighborhood(event.target.value)} />
                        </Form.Group>
                        <Form.Group style={{padding: 5}} controlId="formGridEmail">
                            <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Rua</Form.Label>
                            <Form.Control type="tel" placeholder="Rua" onChange={event => setStreet(event.target.value)} />
                        </Form.Group>
    
                        <Form.Group style={{padding: 5}} controlId="formGridPassword">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Número</Form.Label>
                                <Form.Control type="text" placeholder="Número da casa" onChange={event => setHouseNumber(event.target.value)} />
                            </div>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group style={{padding: 5}} controlId="formGridEmail">
                        <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Complemento</Form.Label>
                            <Form.Control type="text" placeholder="Complemento" onChange={event => setComplement(event.target.value)} />
                        </Form.Group>
                        <Form.Group style={{padding: 5}} controlId="formGridPassword">
                            <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Referência</Form.Label>
                            <Form.Control type="text" placeholder="Referência" onChange={event => setReference(event.target.value)} />
                        </Form.Group>
                        <Form.Group style={{padding: 5}} controlId="formGridState">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Categoria</Form.Label>
                                <form onChangeCapture={(event) => setIdCategories(event.target.value)}>
                                    <select>
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
                            <Form.Control type="url" placeholder="Link" onChange={event => setFacebook(event.target.value)} />
                        </Form.Group>
    
                        <Form.Group style={{padding: 5}} controlId="formGridPassword">
                            <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Instagran</Form.Label>
                            <Form.Control type="url" placeholder="Link" onChange={event => setInstagram(event.target.value)} />
                        </Form.Group>
                        <Form.Group style={{padding: 5}} controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="none" style={{fontSize: 14}}>Descrição</Form.Label>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Form.Control  style={{width: 300}}  as="textarea" rows="2" onChange={event => handleDescription(event)} />
                            </div>
                        </Form.Group>
                    </Form.Row>
                    <Button style={{marginTop: -50}} variant="success" onClick={() => sendToApi()}>
                        Salvar
                    </Button>
                    </Form>
                </>
              )}
              <ToastContainer />
            </Container>
        </div>
    )
}