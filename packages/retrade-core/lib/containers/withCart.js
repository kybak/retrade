import { getActions,} from 'meteor/vulcan:lib';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ ui: state.ui, });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().ui, dispatch);

const withCart = (component) => connect(mapStateToProps, mapDispatchToProps)(component);

export default withCart;
