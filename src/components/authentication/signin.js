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
            password: '',
            errorMessage: '',
        };
    },
    render: function(){
        return (
            <View style={styles.container}>
                <Text>
                    Sign In
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
                    Password:
                </Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}
                    />
                <Text style={styles.label}>{this.state.errorMessage}</Text>
                <Button text={'Sign In'} onPress={this.onSigninPress} styles={this.buttonStyle()} />
                <Button text={'I need an account...'} onPress={this.onSignupPress} styles={this.buttonStyle()} />
            </View>

        );
    },
    buttonStyle: function() {
        return {
            borderColor: 'gray',
        }
    },
    onSignupPress: function() {
        // navigate to signup push new route.
        // ideal => navigator.push('signup'); but no reference of navigator
        // so we need to pass the naigator as references
        this.props.navigator.push({name: 'signup'});
        //to comunicate between views, add props in the push route item
        //ie: this.props.navigator.push({name: 'signup', bookId: this.props.book.id});
        //and receive in signup by using: this.props.bookId;
    },
    onSigninPress: function() {
        Parse.User.logIn(this.state.username, this.state.password, {
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
