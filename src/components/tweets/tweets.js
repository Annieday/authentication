'use strict';
import React, {
    Text,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

import Parse from 'parse/react-native';
import Button from '../common/button';

module.exports = React.createClass({
    getInitialState: function(){
        return {
            user: null,
        };
    },
    componentWillMount: function() {
        Parse.User.currentAsync()
            .then(
                (user) => { this.setState({user: user});
            });
    },
    render: function(){
        if(!this.state.user) {
            return <Text>Loading...</Text>
        }
        var username = this.state.user.get('username');
        return (
            <View style={styles.container}>
                <Text>
                    Welcome Back!
                </Text>
                <Button text={'Sign Out'} onPress={this.onSignoutPress} styles={this.buttonStyle()} />
            </View>
        );
    },
    buttonStyle: function() {
        return {
            borderColor: 'gray',
        }
    },
    onSignoutPress: function(){

    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
