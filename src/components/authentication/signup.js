'use strict';
import React, {
    Text,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

import Button from '../common/button';
import Parse from 'parse/react-native';

module.exports = React.createClass({
    getInitialState: function(){
        return {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errorMessage: '',
        };
    },
    render: function(){
        return (
            <View style={styles.container}>
                <Text>
                    Sign Up
                </Text>

                <Text style={styles.lable}>
                    Username:
                </Text>
                <TextInput
                    style={styles.input}
                    value={this.state.username}
                    autoCapitalize={'none'}
                    onChangeText={(text) => this.setState({username: text})}
                    />
                <Text style={styles.lable}>
                    Email:
                </Text>
                <TextInput
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                    />
                <Text style={styles.lable}>
                    Password:
                </Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}
                    />
                <Text style={styles.lable}>
                    Password Confirm:
                </Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    value={this.state.passwordConfirmation}
                    onChangeText={(text) => this.setState({passwordConfirmation: text})}
                    />
                <Text style={styles.label}>{this.state.errorMessage}</Text>
                <Button text={'Sign Up'} onPress={this.onSignupPress} styles={this.buttonStyle()} />
                <Button text={'I have an account...'} onPress={this.onSigninPress} styles={this.buttonStyle()} />

            </View>

        );
    },
    buttonStyle: function() {
        return {
            borderColor: 'gray',
        }
    },
    onSigninPress: function() {
        this.props.navigator.pop();
    },
    onSignupPress: function() {
        if(this.state.password !== this.state.passwordConfirmation) {
            return this.setState({
                errorMessage: 'Your passwords do not match',
            });
        }

        var newUser = new Parse.User();
        newUser.set("username", this.state.username);
        newUser.set("password", this.state.password);
        newUser.set("email", this.state.email);
        newUser.signUp(null, {
            success: (user) => {
                this.props.navigator.immediatelyResetRouteStack([{ name: 'tweets' }]);
            },
            error: (data, error) => {
                this.setState({
                    errorMessage: error.message,
                });
            },
        });
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 4,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        width: 200,
        alignSelf: 'center',
    },
    lable: {
        fontSize: 18,
    },
});
