import React, {useEffect, useState} from 'react';
import SideMenu from '../../components/sideMenu/index'
import {Container, Div} from './style.js';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import {useSelector} from 'react-redux';

export default function Home () {

    let user  = useSelector(state => state.LOGIN.data)

    const [categories, setCategories] = useState([]);
    const [total , settotal] = useState('0');
    // useEffect(()=> {
    //     getCategories();
    //     getTotal();
    // }, [])

    // async function getCategories() {
    //     await api.get('/categories')
    //         .then((response)=> {
    //             setCategories(response.data.data);
    //             console.log(response.data.data)
    //         })
    // }
    // async function getTotal () {
    //     await api.get('/dashboard')
    //     .then((response)=> {
    //         settotal(response.data.data)
    //     })
    // }
    return (
        <div> 
            <SideMenu option={'home'} />
            <div style={{display: 'flex' , justifyContent: 'flex-end', padding: 8}}>
                <FontAwesomeIcon style={{marginRight: 4}} icon={faUser} />
                <small>Usúario: {user.name}</small>
            </div>
            <Container>
                <Div>
                    <div className="tag" style={{display: 'flex', marginBottom: 2}}>
                        <Card style={{ width: '18rem', margin:6 }}>
                            <Card.Body>
                                <Card.Title style={{fontSize: 14}}>Total de colaboradores:</Card.Title>
                                <Card.Text style={{fontSize: 14}}>
                                Total: {total}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem', margin:6  }}>
                            <Card.Body>
                                <Card.Title style={{fontSize: 14}}>Total de contratados:</Card.Title>
                                <Card.Text style={{fontSize: 14}}>
                                Total: 34
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="tag" style={{display: 'flex'}}>
                        <Card style={{ width: '18rem', margin:6  }}>
                            <Card.Body>
                                <Card.Title style={{fontSize: 14}}>Total de voluntários:</Card.Title>
                                <Card.Text style={{fontSize: 14}}>
                                Total: 23
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem', margin:6  }}>
                            <Card.Body>
                                <Card.Title style={{fontSize: 14}}>Outros:</Card.Title>
                                <Card.Text style={{fontSize: 14}}>
                                Total: 45
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Div>
            </Container>
        </div>
    )
}