import React from 'react';
import SearchResult from '../search-results/SearchResult.jsx'
import TopBar from '../top-bar/TopBar.jsx'
import SearchForm from './SearchForm.jsx'
import styled from 'styled-components'
import { borderRadius, boxShadow, transition } from '../../stylesheets/style.utils.js';



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


const BottomBar = styled.div`
  background: ${props => props.theme.footer};
  color: white;
  font-size: 11px;
  height: 50px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: -1
`;

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
        // setTimeout(function() {
        return (
            <div className="flex-column">
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
            </div>
        );
        // }, 500);
    }

    render() {
        const showResults = this.state.showResults;

        return (
            <div className="flex-column full-height">

                <TopBar />

                <SearchSection className="flex-column justify-space-between" top={this.state.top}>
                    <h1 style={{color: "white"}}>SEARCH</h1>
                    {/*<img src="/bulb_smooth.png" height="200"/>*/}

                    <div className="flex-column">
                        <SearchForm submit={(e)=> this.go(e)} />
                    </div>

                </SearchSection>


                <SearchResults className="flex-column justify-center align-center">
                    {showResults ? this.getResults() : <h1>Enter your query above</h1>}
                </SearchResults>

                <BottomBar className="flex-row">©2017 ReTrade</BottomBar>
            </div>
        )
    }
}

