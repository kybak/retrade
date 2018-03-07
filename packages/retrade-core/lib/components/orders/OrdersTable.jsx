import React from 'react';
import {withList, withEdit, registerComponent, Components} from 'meteor/vulcan:core';
import Orders from '../../modules/orders/collection.js'
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import keycode from 'keycode';
import styled from 'styled-components'
import {Link} from 'react-router'
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import CheckIcon from 'material-ui-icons/Check';
import PaymentIcon from 'material-ui-icons/Payment';
import FilterListIcon from 'material-ui-icons/FilterList';
import Header from '../common/layouts/header/Header.jsx'
import BannerSmall from '../common/layouts/header/BannerSmall.jsx'
import ComponentContainer from '../common/layouts/body/ComponentContainer.jsx'
import PaymentModal from './modals/payment/Payment.jsx'


let counter = 0;

function createData(buyer, seller, item, confirmed, paid, invoiceSent, deliveryAddress, multiple, createdAt) {
    counter += 1;
    return {id: counter, buyer, seller, item, confirmed, paid, invoiceSent, deliveryAddress, multiple, createdAt};
}

const columnData = [
    {id: 'buyer', numeric: false, disablePadding: true, label: 'Buyer'},
    {id: 'seller', numeric: true, disablePadding: false, label: 'Seller'},
    {id: 'item', numeric: true, disablePadding: false, label: 'Item'},
    {id: 'confirmed', numeric: true, disablePadding: false, label: 'Confirmed'},
    {id: 'paid', numeric: true, disablePadding: false, label: 'Paid'},
    {id: 'invoiceSent', numeric: true, disablePadding: false, label: 'Invoice Sent'},
    {id: 'deliveryAddress', numeric: true, disablePadding: false, label: 'Delivery Address'},
];


const TableContainer = styled.div`
    background: ${props => props.theme.secondaryBackground};
    overflow: auto;
`;

const Status = styled.span.attrs({
    $color: props => props.color
})`
    color: ${props => props.$color.indexOf('AWAITING') > -1 || props.$color.indexOf('NOT') > -1 ? 'orangered' : 'mediumseagreen'};
`;

class EnhancedTableHead extends React.Component {
    static propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

const toolbarStyles = theme => ({
    root: {
        paddingRight: 2,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.A700,
                backgroundColor: theme.palette.secondary.A100,
            }
            : {
                color: theme.palette.secondary.A100,
                backgroundColor: theme.palette.secondary.A700,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const {selected, classes} = props;

    let confirmOrder = (selected) => {
        mutate().then(res => console.log(res));

        async function mutate() {
            for (item of selected) {

                await props.editMutation({
                    documentId: item._id,
                    set: {confirmed: true},
                    unset: {}
                }).then((res) => props.refetch());
            }

            return 'dun'
        }
    };

    let pay = (selected) => {
        // if awaiting payment don't show
        props.showModal();
        // confirm payment details
        // call server: make invoice, charge payment, mark as paid
        // mutate().then(res => console.log(res));

        /*async function mutate() {
            for (id of selected) {

                await props.editMutation({
                    documentId: id,
                    set: {paid: true},
                    unset: {}
                }).then((res) => props.refetch());
            }

            return 'dun'
        }*/
    };

    return (
        <Toolbar

        >
            <div className={classes.title}>
                {selected.length > 0 ? (
                    <Typography type="subheading">{selected.length} selected</Typography>
                ) : (
                    <Typography type="title">My Parts</Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>

                {selected.length > 0 ? (
                    <div className="flex-row">
                        <Tooltip title="Confirm">
                            <IconButton onClick={() => confirmOrder(selected)} aria-label="Confirm">
                                <CheckIcon/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Pay">
                            <IconButton onClick={() => pay(selected)} aria-label="Pay">
                                <PaymentIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    selected: PropTypes.array.isRequired,
};

const mutationOptions = {
    collection: Orders,
    fragmentName: 'OrderFragment'
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
registerComponent('EnhancedTableToolbar', EnhancedTableToolbar, [withEdit, mutationOptions]);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'buyer',
            selected: [],
            data: props.results ? props.results : [],
            page: 0,
            rowsPerPage: 5,
            showModal: false,
            paymentSuccess: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.results});
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({data, order, orderBy});
        // this.props.changeSort(orderBy);
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({
                selected: this.state.data.map(n => {
                    console.log(n);
                    return {_id: n._id, amt: n.amt, owner: n.item.owner, seller: n.seller}
                })
            });
            return;
        }
        this.setState({selected: []});
    };

    handleKeyDown = (event, item) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, item);

        }
    };

    handleClick = (event, item) => {
        const {selected} = this.state;
        const selectedIndex = selected.findIndex(i => item._id === i._id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, item];
        } else if (selectedIndex === 0) {
            newSelected = [...selected.slice(1)];
        } else if (selectedIndex === selected.length - 1) {
            newSelected = [...selected.slice(0, -1)];
        } else if (selectedIndex > 0) {
            newSelected = [
                ...selected.slice(0, selectedIndex),
                ...selected.slice(selectedIndex + 1)
            ];
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
        // this.props.changeSkip(page * this.state.rowsPerPage);
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = _id => {
        return this.state.selected.findIndex(i => _id === i._id) !== -1;
    };

    postPayment = success => {
        this.setState({showModal: false, paymentSuccess: success, selected: []});
        this.props.refetch();
    };


    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <ComponentContainer>

                <Header/>

                <BannerSmall/>

                <TableContainer className="flex-column align-center flex-grow">

                    <div className="flex-row align-center" style={{width: "95%", margin: "30px 0"}}>
                        <Link to={"/account"} style={{color: "black"}}>
                            <i className="fa fa-arrow-left space-right" aria-hidden="true"></i>
                            Back to account
                        </Link>
                    </div>

                    <Paper style={{width: "95%", margin: "0 20px 40px 20px"}}>
                        <Components.EnhancedTableToolbar selected={selected} refetch={this.props.refetch}
                                                         showModal={() => this.setState({showModal: true})}/>
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table}>
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={data.length}
                                />
                                <TableBody>
                                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                        const isSelected = this.isSelected(n._id);
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, {_id: n._id, amt: n.amt, owner: n.item.owner, seller: n.seller})}
                                                onKeyDown={event => this.handleKeyDown(event, {
                                                    _id: n._id,
                                                    amt: n.amt,
                                                    owner: n.item.owner,
                                                    seller: n.seller
                                                })}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n._id}
                                                selected={isSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isSelected}/>
                                                </TableCell>
                                                <TableCell padding="none">{n.buyer}</TableCell>
                                                <TableCell numeric>{n.seller}</TableCell>
                                                <TableCell numeric>{n.item.itemName}</TableCell>
                                                <TableCell numeric><Status
                                                    color={n.confirmed}>{n.confirmed}</Status></TableCell>
                                                <TableCell numeric><Status
                                                    color={n.paid}>{n.paid}</Status></TableCell>
                                                <TableCell numeric><Status
                                                    color={n.invoiceSent}>{n.invoiceSent}</Status></TableCell>
                                                <TableCell numeric>{n.deliveryAddress}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            count={data.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </Paper>
                </TableContainer>

                {this.state.showModal &&
                <PaymentModal hide={() => this.setState({showModal: false})} selected={this.state.selected} closeModal={success=>this.postPayment(success)}/>}
            </ComponentContainer>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
const listOptions = {
    collection: Orders,
    queryName: 'orderListUser',
    fragmentName: 'OrderFragment',
};

registerComponent('OrdersTable', EnhancedTable, [withStyles, styles], [withList, listOptions]);
// export default withStyles(styles)(EnhancedTable);

