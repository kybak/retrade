import React from 'react';
import SearchResult from './search-results/SearchResult.jsx'
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
    position: relative!important;
    width:100%!important;
    height: 180px;
    background: ${props => props.theme.primaryBackground};
    align-items: center;
    z-index: 0;
    padding-top: 40px;
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

const SearchResults = styled.div`
    flex-grow: 1;
    width: 100%;
`;

const fakeData = [
    {name: "DI SCHOTTKY MBRS340 FCS"},
    {name: "DI SCHOTTKY MBRS341 FCS"},
    {name: "DI SCHOTTKY MBRS342 FCS"},
    {name: "DI SCHOTTKY MBRS343 FCS"},
];

export default class Search extends React.Component {

    constructor(props) {
        super(props);

        this.go = this.go.bind(this);

        this.state = {
            showResults: false,
            top: "0px"
        };
    }

    go(e) {
        e.preventDefault();
        this.setState({top: "-100px"});

        const self = this;
        setTimeout(function () {
            self.setState({showResults: true});
        }, 250);
    }

    getResults() {
        const data = fakeData.map(component => <div><SearchResult name={component.name}/></div>);

        return (
            <Stagger transition="fadeIn" delay={200} className="flex-column">
                {data}
            </Stagger>

        );
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
                        <SearchForm submit={(e) => this.go(e)}/>
                    </div>

                </SearchSection>


                <SearchResults className="flex-column justify-center align-center">
                    {showResults ? this.getResults() : <h1>Enter your query above</h1>}
                </SearchResults>

                <Footer/>
            </div>
        )
    }
}

