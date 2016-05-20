'use strict';
import React, {
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

module.exports = React.createClass({
    render: function(){
        return (
            <TouchableHighlight
                style={[styles.button,this.props.styles]}
                underlayColor={'gray'}
                onPress={this.props.onPress}
                >
                <Text style={styles.buttonText}>
                    {this.props.text}
                </Text>
            </TouchableHighlight>
        );
    },
});

var styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: 'black',
        marginTop: 10
    },
    buttonText: {
        flex: 1,
        alignSelf: 'center',
    },
});
