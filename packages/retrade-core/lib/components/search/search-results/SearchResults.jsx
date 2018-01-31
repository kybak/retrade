import React from 'react';
import styled from 'styled-components'
import {Components, withList, registerComponent} from "meteor/vulcan:core";
import Stagger from 'react-css-stagger';
import Inventory from '../../../modules/inventory/collection.js'
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
// import ComponentContainer from '../common/layouts/body/ComponentContainer.jsx'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import FilterList from 'material-ui-icons/FilterList';
import ChevronRight from 'material-ui-icons/ChevronRight';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Drawer from 'material-ui/Drawer';
import Tooltip from 'material-ui/Tooltip';

const Container = styled.div`
    background-color: #EEEEEE;
    padding: 40px 0;
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: auto;
    padding-top: 210px;
`;

const ResultsContainer = styled.div`
    width: 800px;
`;

const PageNumber = styled.a`
    color: black;
    margin-right: 10px;
`;

const Label = styled.span`
    color: #969696;
    margin-right: 10px;
`;

let totalCount = 0;

class SearchResults extends React.Component {

    constructor(props) {
        super(props);

        // props.setTotal(props.totalCount);

        this.state = {
            data: props.results,
            total: props.totalCount,
            sort: "itemName",
            skip: props.skip,
            drawerOpen: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.results, total: nextProps.totalCount, skip: nextProps.skip});
    }

    getResults() {
        const data = this.state.data.map(component => <Components.SearchResult key={component.itemNumber}
                                                                               component={component}/>);

        return (
            <Stagger transition="fadeIn" delay={200} className="flex-column">
                {data}
            </Stagger>

        );
    }

    setSkipState(e, s) {
        e.preventDefault();
        this.props.setSkip(s);
    }

    scrollRight = () => {
        const currentSkip = this.state.skip;
        this.props.setSkip(currentSkip + 10);
    };

    scrollLeft = () => {
        const currentSkip = this.state.skip;
        this.props.setSkip(currentSkip - 10);
    };

    isActive = (page) => {
        const skip = this.state.skip, style = {color: '#3D9BE9'}, m = page * 10;
        if (skip === m - 10) return style;
        return {color: "black"}
    };

    getPages() {
        let pages = [], t = this.state.total / 10;
        for (let i = 0; i < t; i++) {
            let n = i + 1, s = n * 10 - 10;
            pages.push(<PageNumber href="#" key={n} style={this.isActive(n)}
                                   onClick={e => this.setSkipState(e, s)}>{n}</PageNumber>);
        }
        return <div className="flex-row justify-end align-center full-width">
            <IconButton className="space-right" aria-label="Menu" onClick={() => this.scrollLeft()}>
                <ChevronLeft/>
            </IconButton>
            {pages}
            <IconButton aria-label="Menu" onClick={() => this.scrollRight()}>
                <ChevronRight/>
            </IconButton>
        </div>;
    }

    changeSort = (e) => {
        this.props.changeSort(e);
        this.setState({sort: e.target.value});
    };


    render() {
        const {loadMore, count, totalCount, showResults} = this.props;
        return (
            <Container className="flex-column align-center flex-grow full-width"
                       top={showResults ? "-100px" : ""}>

                <ResultsContainer className="flex-column align-center">
                    {showResults &&
                    <AppBar position="static" className="full-width" style={{background: "white", marginBottom: "5px"}}>
                        <Toolbar>
                            <div className="flex-row justify-space-between align-center full-width">
                                <div className="flex-row align-center">
                                    <Label>Sort by:</Label>

                                    <Select
                                        value={this.state.sort}
                                        onChange={this.changeSort}
                                        style={{width: "200px", height: "26px", padding: "7px"}}
                                    >
                                        <MenuItem value="itemName">Item Name</MenuItem>
                                        <MenuItem value="itemNumber">Item Number</MenuItem>
                                    </Select>
                                </div>


                                <Tooltip id="tooltip-right" title="Filter options" placement="right">
                                    <IconButton aria-label="Menu" onClick={() => this.setState({drawerOpen: true})}>
                                        <FilterList/>
                                    </IconButton>
                                </Tooltip>
                            </div>

                        </Toolbar>
                    </AppBar>
                    }

                    <div>
                        {showResults ? this.getResults() : <h1>Enter your query above</h1>}
                    </div>

                    {showResults && this.getPages()}

                </ResultsContainer>

                <Drawer anchor="right" open={this.state.drawerOpen} onClose={() => this.setState({drawerOpen: false})}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => this.setState({drawerOpen: false})}
                        onKeyDown={() => this.setState({drawerOpen: false})}
                    >

                        <div style={{width: "250px"}}>

                        </div>
                    </div>
                </Drawer>

            </Container>
        )
    }
}

const listOptions = {
    collection: Inventory,
    queryName: 'inventoryList',
    fragmentName: 'InventoryItemFragment',
};

registerComponent('SearchResults', SearchResults, [withList, listOptions]);

// TODO take header out of column and make results container full page with margin so that its location does not depend on the header