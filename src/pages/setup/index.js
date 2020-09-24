import React from 'react';
import SideMenu from '../../components/sideMenu/index'

export default function Setup () {
    function ExitApp(){
        
    }
    return (
        <div>
            <SideMenu option={'setup'} />
            {ExitApp()}
        </div>
    )
}