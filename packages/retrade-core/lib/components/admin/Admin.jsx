import React from 'react';
import styled from 'styled-components'
import ComponentContainer from '../common/layouts/body/ComponentContainer.jsx'
import Header from '../common/layouts/header/Header.jsx'
import BannerSmall from '../common/layouts/header/BannerSmall.jsx'
import AllUsers from './AllUsers.jsx'
import AllParts from './AllParts.jsx'
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

const AdminContainer = styled.div`
    background: ${props => props.theme.secondaryBackground};
    width: 100%;
    flex-grow: 1;
    position: relative;
    overflow: auto;
    height: 500px;
`;


function TabContainer(props) {
    return <div style={{padding: 8 * 3}}>{props.children}</div>;
}

export default class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
        };
    }

    handleChange = (event, value) => {
        this.setState({value});
    };


    render() {
        const {value} = this.state;

        return (
            <ComponentContainer>

                <Header/>

                <BannerSmall/>

                <AdminContainer className="flex-column">
                    <Paper>

                        <AppBar position="static">
                            <Tabs value={value} onChange={this.handleChange} centered>
                                <Tab label="USERS"/>
                                <Tab label="PARTS"/>
                            </Tabs>
                        </AppBar>

                        {value === 0 && <AllUsers/>}
                        {value === 1 && <TabContainer>Coming Soon</TabContainer>}
                        {value === 2 && <TabContainer>Item Three</TabContainer>}

                    </Paper>
                </AdminContainer>



            </ComponentContainer>
        )
    }
}

