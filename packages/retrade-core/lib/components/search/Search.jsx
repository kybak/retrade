import React from 'react';
import {Components, withList, registerComponent} from "meteor/vulcan:core";
import Header from '../common/layouts/header/Header.jsx'
import Footer from '../common/layouts/footer/Footer.js'
import SearchForm from './SearchForm.jsx'
import styled from 'styled-components'
import {borderRadius, boxShadow, transition} from '../../stylesheets/style.utils.js';
import Stagger from 'react-css-stagger';

const SearchSection = styled.div.attrs({
    $top: props => props.top
})`
    top: ${props => props.$top};
    position: absolute;
    width:100%!important;
    height: 180px;
    background: ${props => props.theme.primaryBackground};
    align-items: center;
    z-index: 0;
    padding-top: 40px;
    z-index: 1200;
    ${transition("all", ".5s")};
    
    

    img {
      top: 96px;
      right: 50%;
      -webkit-transform: rotate(71deg);
      -moz-transform: rotate(71deg);
      -ms-transform: rotate(71deg);
      -o-transform: rotate(71deg);
      transform: rotate(71deg) translate(25%, -25%);
    }

    h1 {
      margin: 0 !important;

      span {
        color: $green;
      }
  `;

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.go = this.go.bind(this);


        this.state = {
            showResults: false,
            top: "0px",
            search: "",
            total: 0,
            skip: 0,
            sort: "itemName",
            value: 0
        };
    }

    go(e, s) {
        e.preventDefault();
        this.setState({top: "-100px"});
        const self = this;

        // TODO remove timeout
        // timeout to simulate network delay
        setTimeout(function () {
            self.setState({showResults: true});
            self.setState({search: s});
        }, 250);
    }


    render() {
        const showResults = this.state.showResults;

        return (
            <div className="flex-column full-height">

                <Header/>

                <SearchSection className="flex-column justify-space-between" top={this.state.top}>
                    <h1 style={{color: "white"}}>SEARCH</h1>
                    {/*<img src="/bulb_smooth.png" height="200"/>*/}

                    <div className="flex-column">
                        <SearchForm submit={(e, s) => this.go(e, s)}/>
                    </div>

                </SearchSection>

                <Components.SearchResults
                    showResults={this.state.showResults}
                    terms={{query: this.state.search, skip: this.state.skip, limit: 10, sort: {[this.state.sort]: 1}}}
                    setSkip={s => this.setState({skip: s})}
                    changeSort={e => this.setState({sort: e.target.value})}
                    skip={this.state.skip}
                />

                <Footer/>
            </div>
        )
    }
}


registerComponent('Search', Search);

