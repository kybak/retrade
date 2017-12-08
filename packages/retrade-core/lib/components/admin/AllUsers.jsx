import React from 'react';
import styled from 'styled-components'
import ComponentContainer from '../common/layouts/body/ComponentContainer.jsx'
import EditUser from './modals/EditUser.jsx'
import {withList} from 'meteor/vulcan:core';
import {getFragment} from 'meteor/vulcan:lib';
import Users from 'meteor/vulcan:users'
import {withStyles} from 'material-ui/styles';
import keycode from 'keycode';
import PropTypes from 'prop-types';
import {Link} from 'react-router'
import Dialog, { DialogTitle } from 'material-ui/Dialog';
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
import EditIcon from 'material-ui-icons/Edit';
import FilterListIcon from 'material-ui-icons/FilterList';

let counter = 0;

function createData(id, companyName, email, fullName, country, billing, shipping) {
    counter += 1;
    return {id: counter, id, companyName, email, fullName, country, billing, shipping};
}

const columnData = [
    {id: 'id', numeric: false, disablePadding: true, label: 'ID'},
    {id: 'companyName', numeric: true, disablePadding: false, label: 'Company Name'},
    {id: 'email', numeric: true, disablePadding: false, label: 'Email'},
    {id: 'fullName', numeric: true, disablePadding: false, label: 'Full Name'},
    {id: 'country', numeric: true, disablePadding: false, label: 'Country'},
    {id: 'billing', numeric: true, disablePadding: false, label: 'Billing Address'},
    {id: 'shipping', numeric: true, disablePadding: false, label: 'Shipping Address'},
];


const TableContainer = styled.div`
    background: ${props => props.theme.secondaryBackground};
    overflow: auto;
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

    return (
        <Toolbar

        >
            <div className={classes.title}>
                {selected.length > 0 ? (
                    <Typography type="subheading">{selected.length} selected</Typography>
                ) : (
                    <Typography type="title">All Users</Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {selected.length > 0 ? (
                    <div className="flex-row">
                        <Tooltip title="Edit">
                            <IconButton aria-label="Edit" className="space-right">
                                <EditIcon onClick={()=> props.editUser(selected[0])}/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                                <DeleteIcon/>
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
    classes: PropTypes.object,
    selected: PropTypes.array.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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

        const users = this.props.users.map((user) => {
            return createData(
                user._id,
                user.username,
                user.email,
                user.profile ? user.profile.fullName : "",
                user.profile ? user.profile.country : "",
                user.profile ? user.profile.billingAddress : "",
                user.profile ? user.profile.deliveryAddress : "",
            )
        });


        this.state = {
            order: 'asc',
            orderBy: 'companyName',
            selected: [],
            data: users.sort((a, b) => (a.companyName < b.companyName ? -1 : 1)),
            page: 0,
            rowsPerPage: 5,
        };
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
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({selected: this.state.data.map(n => n.id)});
            return;
        }
        this.setState({selected: []});
    };

    handleKeyDown = (event, id) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, id);
        }
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (


            <TableContainer className="flex-column align-center flex-grow">

                <Paper style={{width: "95%", margin: "40px 20px"}}>
                    <EnhancedTableToolbar selected={selected} editUser={(user)=> this.props.openModal(user)}/>
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
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            onKeyDown={event => this.handleKeyDown(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected}/>
                                            </TableCell>
                                            <TableCell padding="none">{n.id}</TableCell>
                                            <TableCell numeric>{n.companyName}</TableCell>
                                            <TableCell numeric>{n.email}</TableCell>
                                            <TableCell numeric>{n.fullName}</TableCell>
                                            <TableCell numeric>{n.country}</TableCell>
                                            <TableCell numeric>{n.billing}</TableCell>
                                            <TableCell numeric>{n.shipping}</TableCell>
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
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object,
};

class AllUsers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

    }


    render() {
        const {classes, results} = this.props;

        return (
            <div>
                <EnhancedTable classes={classes} users={results} openModal={(user)=> this.setState({open: !this.state.open, user: user})}/>

                <Dialog onRequestClose={this.handleRequestClose} open={this.state.open}>
                    <EditUser close={()=> this.setState({open: false})} documentId={this.state.user}/>
                </Dialog>
            </div>
        )
    }
}

const UserFragment = getFragment('UsersCurrent');
const listOptions = {
    collection: Users,
    queryName: 'usersListQuery',
    fragment: UserFragment,
};

export default withStyles(styles)(withList(listOptions)(AllUsers));