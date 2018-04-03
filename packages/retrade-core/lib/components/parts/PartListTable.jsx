/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import {withList, registerComponent} from 'meteor/vulcan:core';
import Inventory from '../../modules/inventory/collection.js'
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
import FilterListIcon from 'material-ui-icons/FilterList';
import Header from '../common/layouts/header/Header.jsx'
import BannerSmall from '../common/layouts/header/BannerSmall.jsx'
import ComponentContainer from '../common/layouts/body/ComponentContainer.jsx'


let counter = 0;

function createData(itemName, itemNumber, accountCode, customerRelation, externalItemNumber, mfm, info, multiple, createdAt) {
  counter += 1;
  return {id: counter, itemName, itemNumber, accountCode, customerRelation, externalItemNumber, mfm, info, multiple, createdAt};
}

const columnData = [
  {id: 'itemName', numeric: false, disablePadding: true, label: 'Item Name'},
  {id: 'itemNumber', numeric: true, disablePadding: false, label: 'Item Number'},
  {id: 'accountCode', numeric: true, disablePadding: false, label: 'Account Code'},
  {id: 'customerRelation', numeric: true, disablePadding: false, label: 'Customer Relation'},
  {id: 'externalItemNumber', numeric: true, disablePadding: false, label: 'External Item Number'},
  {id: 'mfm', numeric: true, disablePadding: false, label: 'MFM'},
  {id: 'info', numeric: true, disablePadding: false, label: 'Info'},
  {id: 'multiple', numeric: true, disablePadding: false, label: 'Multiple'},
  {id: 'createdAt', numeric: true, disablePadding: false, label: 'Created At'},
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
  const {numSelected, classes} = props;

  return (
    <Toolbar

    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography type="title">My Parts</Typography>
        )}
      </div>
      <div className={classes.spacer}/>
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
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
  numSelected: PropTypes.number.isRequired,
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

let stop = 0;
class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      order: 'asc',
      orderBy: 'itemName',
      selected: [],
      data: props.results,
      page: 0,
      rowsPerPage: 5,
    };
  }

  componentWillUpdate(nextProps) {
    console.log(nextProps.results.length);
      console.log(this.state.data);
    if (stop < 4) this.setState({data: nextProps.results});
    console.log(this.state.data);
    stop ++; //TODO do something about this--feedback loop
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
    // this.props.changeSkip(page * this.state.rowsPerPage);
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const {classes} = this.props;
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
    console.log("changed!", data);
    const emptyRows = data ? rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage) : 0;

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
            <EnhancedTableToolbar numSelected={selected.length}/>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data ? data.length : 0}
                />
                <TableBody>
                  {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id)}
                        onKeyDown={event => this.handleKeyDown(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n._id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected}/>
                        </TableCell>
                        <TableCell padding="none">{n.itemName}</TableCell>
                        <TableCell numeric>{n.itemNumber}</TableCell>
                        <TableCell numeric>{n.accountCode}</TableCell>
                        <TableCell numeric>{n.customerRelation}</TableCell>
                        <TableCell numeric>{n.externalItemNumber}</TableCell>
                        <TableCell numeric>{n.mfm}</TableCell>
                        <TableCell numeric>{n.info}</TableCell>
                        <TableCell numeric>{n.multiple}</TableCell>
                        <TableCell numeric>{n.createdAt}</TableCell>
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
                      count={data ? data.length: 0}
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


      </ComponentContainer>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
const listOptions = {
  collection: Inventory,
  queryName: 'inventoryListUser',
  fragmentName: 'InventoryItemFragment',
};

registerComponent('PartListTable', EnhancedTable, [withStyles, styles], [withList, listOptions]);
// export default withStyles(styles)(EnhancedTable);



