'use strict';
import React, {
    StyleSheet,
    Navigator,
} from 'react-native';

import Parse from 'parse/react-native';
import Signin from './components/authentication/signin';
import Signup from './components/authentication/signup';
import Tweets from './components/tweets/tweets';

var ROUTES = {
    signin: Signin,
    signup: Signup,
    tweets: Tweets,
};

module.exports = React.createClass({
    componentWillMount: function() {
        Parse.initialize("g1Ryd4yMSw");
        Parse.serverURL = 'http://localhost:1337/parse'
    },
    renderScene: function(route, navigator){
        var Compoent = ROUTES[route.name];//ROUTES['signin'] => Signin
        //pass route and navigator => Component && receive by using this.props.route...
        return <Compoent route={route} navigator={navigator} />;
    },
    render: function(){
        return (
            <Navigator
                style={styles.container}
                initialRoute={{name: 'signin'}}
                renderScene={this.renderScene}
                configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
                />
        )
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
