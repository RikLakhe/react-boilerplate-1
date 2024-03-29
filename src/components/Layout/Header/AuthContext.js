import React, {Component, createContext} from 'react';
import axios from 'axios';
import {isAuthenticated} from '../../../utils/jwtUtil';
import {clearLocalStorage, getLocalStorage, setLocalStorage} from '../../../utils/storageUtil';
import history from '../../../utils/history';

const AuthContext = createContext({
    user: {},
    isAuthenticated: false,
});

const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends Component {

    state = {
        user: getLocalStorage('user') || {},
        isAuthenticated: isAuthenticated() || false,
    };

    login = ({ email, password }) => {
        return axios.post(`https://dev.citytech.global:1443/customers/v1/login`, { email, password }).then((response) => {
            this.setState({ isAuthenticated: true, user: response.data.data });
            return response;
        })
    };


    logout = () => {
        clearLocalStorage('token');
        clearLocalStorage('fullName');
        clearLocalStorage('customerCode');
        clearLocalStorage('registrationId');
        clearLocalStorage('customerEmail');
        clearLocalStorage('customerStatus');
        clearLocalStorage('user');
        clearLocalStorage('calculation');
        clearLocalStorage('customerCode');

        this.setState({user: {}, isAuthenticated: false});
    };

    goToDashboard = () => {
        history.push({pathname: '/dashboard'});
    };


    render() {
        return (
            <AuthContext.Provider
                {...this.props}
                value={{
                    ...this.state,
                    login: this.login,
                    logout: this.logout,
                    goToDashboard: this.goToDashboard,
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export {AuthProvider, AuthConsumer, AuthContext};

export const withContext = Component => {
    return props => {
        return (
            <AuthContext.Consumer>
                {
                    globalState => {
                        return (
                            <Component
                                {...globalState}
                                {...props}
                            />
                        );
                    }
                }
            </AuthContext.Consumer>
        );
    };
};
