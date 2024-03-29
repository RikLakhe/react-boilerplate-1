import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Dashboard from '../../components/Dashboard/Dashboard';

class DashboardContainer extends Component {

    render() {
        return (
            <Dashboard
                {...this.props}
            />
        );
    }
}

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => {
    return {
        goToDashboard: () => dispatch(push({ pathname: '/dashboard' })),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DashboardContainer);
