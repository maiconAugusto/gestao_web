import React, {useState, useEffect} from 'react';
import SideMenu from '../../components/sideMenu/index';
import {Container} from './style.js'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form'
import FakeAvatar from '../../assets/fake.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast  } from 'react-toastify';
import InputMask from "react-input-mask";
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import { useHistory } from "react-router-dom";
import Resizer from 'react-image-file-resizer';
import Avatar from 'react-avatar';

export default function Add () {
    const [categories, setCategories] = useState([]);
    let history = useHistory()
    const [name, setName] = useState('');
    const [avatar, setavatar] = useState(null)
    const [profile, setProfile] = useState(null)
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
        const _data = {
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
        }
        const data_ = new FormData()
        data_.append('file', avatar)
        data_.append('data', JSON.stringify(_data))
        await api.post('/createcollaborators',data_, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${data_._boundary}`,
               }
        })
        .then(() => {
            toast.success("Adicionado com sucesso!");
            setLoading(false);
            setName('')
            setavatar(null)
            setProfile(null)
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
            setavatar(null)
            setAge('')
            setRg('')
            setCpf('')
            setProfile(null)
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

    async function handleChange(event) {
        if (event.target.files[0] === undefined) {
            setProfile(null)
            return
        }
        setavatar(event.target.files[0])
        Resizer.imageFileResizer(
            event.target.files[0], 400, 400, 'JPEG', 100, 0, uri=>{
                setProfile(uri)
            },'base64')
    }

    return (
        <div>
            <div style={{height: '100vh', position: 'fixed', left: 0, top: 0}}>
                <SideMenu option={'add'}/>
            </div>
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
                    <Form  style={{width: 700}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            
                            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                <div>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Avatar name="Avatar" size={50} round={true} src={profile === null ? FakeAvatar : profile} style={{marginRight: 4, marginTop: 20}} />
                                        <Form.File  
                                            style={{width: 250, marginTop: 25}}
                                            id="custom-file-translate-html"
                                            label="Imagen"
                                            accept="image/*"
                                            data-browse="Procurar"
                                            custom
                                            onChange={handleChange}
                                        />
                                    </div>
                                    </div>
                                    <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Nome</Form.Label>
                                    <Form.Control type="text" placeholder="Nome completo" onChange={event => setName(event.target.value)} />
                                    <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Data de nascimento</Form.Label>
                                    <Form.Control type="date" placeholder="Data de nascimento" onChange={event => setAge(event.target.value)} />
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                      <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>RG</Form.Label>
                                      <InputMask  placeholder="RG" onChange={event => setRg(event.target.value)} />
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>CPF</Form.Label>
                                        <InputMask  mask="999.999.999-99" placeholder="CPF" onChange={event => setCpf(event.target.value)} />
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Telefone fixo</Form.Label>
                                        <InputMask mask="(99) 9999-9999" placeholder="Telefone" onChange={event => setPhone(event.target.value)} />
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Celular (WhatsApp)</Form.Label>
                                        <InputMask mask="(99) 99999-9999" placeholder="WhatsApp" onChange={event => setWhatsApp(event.target.value)} />
                                    </div>
                                    <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Bairro</Form.Label>
                                    <Form.Control type="text" placeholder="Bairro" onChange={event => setNeighborhood(event.target.value)} />
                                </div>
                                <div>
                                    <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Rua</Form.Label>
                                    <Form.Control type="text" placeholder="Rua" onChange={event => setStreet(event.target.value)} />
                                    <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Número</Form.Label>
                                    <Form.Control type="text" placeholder="Número da casa" onChange={event => setHouseNumber(event.target.value)} />
                                    <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Complemento</Form.Label>
                                    <Form.Control type="text" placeholder="Complemento" onChange={event => setComplement(event.target.value)} />
                                    <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Referência</Form.Label>
                                    <Form.Control type="text" placeholder="Referência" onChange={event => setReference(event.target.value)} />
                                    <Form.Group controlId="formGridState">
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
                                    <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>FaceBook</Form.Label>
                                    <Form.Control type="url" placeholder="Link" onChange={event => setFacebook(event.target.value)} />
                                    <Form.Label className="none" style={{fontSize: 14, marginBottom: 0}}>Instagran</Form.Label>
                                    <Form.Control type="url" placeholder="Link" onChange={event => setInstagram(event.target.value)} />
                                    <Form.Label className="none" style={{fontSize: 14}}>Descrição</Form.Label>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Form.Control  style={{width: 300}}  as="textarea" rows="2" onChange={event => handleDescription(event)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: 25, marginTop: 20, marginBottom: 20}}>
                            <Button variant="success" onClick={() => sendToApi()}>
                                Salvar
                            </Button>
                        </div>
                    </Form>
                </>
              )}
              <ToastContainer />
            </Container>
        </div>
    )
}