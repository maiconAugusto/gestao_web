import React, {useState} from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCog, faUserPlus, faUserTimes, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";

export default function SideMenu (props) {
    let history = useHistory()
    return (
        <SideNav
            onSelect={(selected) => {
                if (selected === '/') {
                    localStorage.removeItem('@email');
                    history.push(selected);
                }
                else {
                    history.push(selected);
                }
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected={props.option}>
                <NavItem eventKey="home">
                    <NavIcon>
                        <FontAwesomeIcon icon={faHome} />
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="add">
                    <NavIcon>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </NavIcon>
                    <NavText>
                        Adicionar
                    </NavText>
                </NavItem>
                <NavItem eventKey="remove">
                    <NavIcon>
                        <FontAwesomeIcon icon={faUserTimes} />
                    </NavIcon>
                    <NavText>
                        Remover
                    </NavText>
                </NavItem>
                <NavItem eventKey="search">
                    <NavIcon>
                        <FontAwesomeIcon icon={faSearch} />
                    </NavIcon>
                    <NavText>
                        Procurar
                    </NavText>
                </NavItem>
                <NavItem eventKey="setup">
                    <NavIcon>
                        <FontAwesomeIcon icon={faCog} />
                    </NavIcon>
                    <NavText>
                        Configurações
                    </NavText>
                    <NavItem eventKey="/">
                        <NavText>
                            Sair
                        </NavText>
                    </NavItem>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}