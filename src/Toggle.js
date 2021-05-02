

//npm install react-switch


import React, { Component } from 'react'

import Switch from "react-switch";

import './Toggle.css';

class Toggle extends Component {
    constructor(props)
    {
        super(props);
        this.state={checked: false};
        this.handler=this.handler.bind(this);
    }

    handler(checked)
    {
        this.setState({checked});
    }


    render() {
        return (
            <div>
                <Switch onChange={this.handler} 
                        checked={this.state.checked} 
                        onColor="#ff7f7f" 
                        onHandleColor="#FF0000"
                        uncheckedIcon=""
                        checkedIcon=""
                        height={25}
                        width={45}
                        />
            </div>
        )
    }
}

export default Toggle;
