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

  var birthDay = "1990/03/19";
  var age = moment(new Date()).diff(moment(birthDay),'years',true);
    const [lgShow, setLgShow] = useState(false);
    const [data, setData] = useState({});
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
    function ViewUser () {
        return (
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => {
              setLgShow(false)
              setData({})
            }}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            {console.log(data)}
            <Modal.Header closeButton>
              <Modal.Title style={{fontSize: 14}} id="example-modal-sizes-title-lg">
                {data.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <small>Idade: {data.age === '' ? 'Não informado' : Math.floor(moment(new Date()).diff(moment(data.age),'years',true))}</small>
                    <br/>
                    <small>Telefone: {data.phone === '' ? 'Não informado' : data.phone}</small>
                    <small>WhatsApp: {data.phone === '' ? 'Não informado' : data.whatsApp}</small>
                    <br/>
                    <small>Bairro: {data.neighborhood === '' ? 'Não informado' : data.neighborhood}</small>
                    <small>Rua: {data.street === '' ? 'Não informado' : data.street}</small>
                    <small>Número: {data.houseNumber === '' ? 'Não informado' : data.houseNumber}</small>
                    <br/>
                    <small>Colaborador: </small>
                    <small>Descrição: {data.description === '' ? 'Não informado' : data.description}</small>
                    <br/>
                    <small>Facebook: {data.instagram === '' ? 'Não informado' : (
                      <a target="_blank" href={data.facebook}>click</a>
                    )}</small>
                    <small>Instagran: {data.instagram === '' ? 'Não informado' : (
                      <a target="_blank" href={data.instagram}>click</a>
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
                            {element.name}
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