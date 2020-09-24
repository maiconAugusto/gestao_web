import React, {useState} from 'react';
import SideMenu from '../../components/sideMenu/index';
import {Container} from './style.js'
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api';
import moment from 'moment';
import 'moment/locale/pt-br'

export default function Search () {

    const [lgShow, setLgShow] = useState(false);
    const [data, setData] = useState({collaborator: ''});
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
          console.log(response.data)
      })
  }
    function ViewUser () {
      console.log(data.collaborator)
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
                    <small>WhatsApp: {data.collaborator.phone === '' ? 'Não informado' : data.collaborator.whatsApp}</small>
                    <br/>
                    <small>Bairro: {data.collaborator.neighborhood === '' ? 'Não informado' : data.collaborator.neighborhood}</small>
                    <small>Rua: {data.collaborator.street === '' ? 'Não informado' : data.collaborator.street}</small>
                    <small>Número: {data.collaborator.houseNumber === '' ? 'Não informado' : data.collaborator.houseNumber}</small>
                    <br/>
                    <small style={{textTransform: 'capitalize'}}>Colaborador: {data.categories}</small>
                    <small>Descrição: {data.collaborator.description === '' ? 'Não informado' : data.collaborator.description}</small>
                    <br/>
                    <small>Facebook: {data.collaborator.instagram === '' ? 'Não informado' : (
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
        <div>
            <SideMenu option={'search'} />
            {ViewUser()}
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
            </Container>
        </div>
    )
}