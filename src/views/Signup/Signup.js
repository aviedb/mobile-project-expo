import React, { Component, Fragment } from 'react';
import { StyleSheet, StatusBar, RefreshControl, Platform, ScrollView, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  Button, 
  Input,
  Layout, 
  Text
} from 'react-native-ui-kitten';

class Login extends Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    refreshing: false
  }

  _onRefresh = () => {
    this.setState({ refreshing: true});
    
    setTimeout(() => {
      this.setState({ 
        refreshing: false,
        username: '',
        email: '',
        password: '',
        password2: ''
      });
    }, 2000);
  }

  handleChange = (key) => (value) => {
    this.setState({
      [key]: value
    });
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: '#3267FF'}}/>
        <SafeAreaView style={styles.safeArea}>
          <Layout style={{flex: 1}}>
            <StatusBar translucent backgroundColor="#3267FF" barStyle="light-content" />
            <ScrollView refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
                colors={["#3267FF"]}
                tintColor="#3267FF"
              />
            }>
              <View style={styles.logo}>
                <Text category="h1" style={styles.logoTitle}>Sign up</Text>
                <Text category="p1" style={styles.logoSubtitle}>Lorem ipsum dolor sit amet</Text>
              </View>
              <View style={styles.container}>
                <Input 
                  keyboardType="email-address"
                  placeholder="Email"
                  value={this.state.email}
                  onChangeText={this.handleChange('email')}
                  style={styles.input}
                />
                <Input 
                  placeholder="Username"
                  value={this.state.username}
                  onChangeText={this.handleChange('username')}
                  style={styles.input}
                />
                <Input 
                  placeholder="Password"
                  value={this.state.password}
                  onChangeText={this.handleChange('password')}
                  secureTextEntry
                  style={styles.input}
                />
                <Input 
                  placeholder="Re-enter password"
                  value={this.state.password2}
                  onChangeText={this.handleChange('password2')}
                  status={this.state.password===this.state.password2?'':'danger'}
                  secureTextEntry
                  style={styles.input}
                />
                <Button onPress={() => this.props.navigation.navigate('Home')}>Sign up</Button>
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <Text category="p1">{"Already have an account? "}</Text>
              <TouchableOpacity>
                <Text 
                  category="p1" 
                  style={styles.create}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </Layout>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight:0,
    backgroundColor: 'white'
  },
  header: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 16,
  },
  container: {
    paddingHorizontal: 40,
    flex: 1
  },
  logo: {
    height: 200,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3267FF',
  },
  logoTitle: {
    color: '#fff',
    fontFamily: 'helvetica_neue_bd'
  },
  logoSubtitle: {
    color: '#fff',
    fontFamily: 'helvetica_neue_lt'
  },
  input: {
    marginBottom: 8
  },
  footer: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 20,
    justifyContent: 'center'
  },
  create: {
    color: '#3267FF',
    fontWeight: 'bold'
  }
});

export default Login;