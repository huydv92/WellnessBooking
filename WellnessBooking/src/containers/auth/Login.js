import React, { PureComponent } from 'react';
import {
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import TextButton from '../../components/common/TextButton';
import TextInput from '../../components/auth/TextInput';
import TextInputPassword from '../../components/auth/TextInputPassword';
import styles from './styles';
import { login } from '../../redux/actions';
import {bindActionCreators} from "redux";

class Login extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      userNameError: '',
      passwordError:'',
    }
  }

  setUserNameState = (username) => {
    this.setState({ userName: username });
  }

  setPasswordState = (password) => {
    this.setState({ password: password });
  }
  
  validate = () => {
    const { userName, password } = this.state;
    console.log('validate');
    let hasError = false;
    if (!userName) {
      this.setState({ userNameError: 'Please enter your user name' })
      hasError = true;
    } else {
      this.setState({ userNameError: '' })
    }
    if (!password) {
      this.setState({ passwordError: 'Please enter your password' })
      hasError = true;
    } else {
      this.setState({ passwordError: '' })
    }
    if (!hasError) {
      this.props.login({ username: userName, password: password });
    }
  };

  render() {
    const {userName, password, userNameError, passwordError} = this.state;
    return (
      <KeyboardAvoidingView
        style={[styles.wrap, { paddingBottom: 50 }]}
        enabled={Platform.OS === 'ios'}
        behavior={'padding'}
        keyboardShouldPersistTaps={'handled'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.hwrap,styles.scrollview
          ]}
          keyboardShouldPersistTaps={'handled'}
        >
          <View style={[styles.center]}>
            <View style={styles.wrapLogo}>
              <Image
                source={require('../../images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text bold style={styles.loginText}>Wellness Booking</Text>
            <TextInput
              placeholder={'username'}
              onChange={(value) => this.setUserNameState(value)}
              errorText={userNameError}
              value={userName}
              keyboardType={'numeric'}
            />
            <TextInputPassword
              secureTextEntry
              placeholder={'password'}
              onChange={(value) => this.setPasswordState(value)}
              value={password}
              errorText={passwordError}
            />
            <View style={[styles.buttonWrap]}>
              <TextButton
                primary
                onPress={() => this.validate()}
                title={'Login'}
              />
            </View>
          </View>

          <View style={styles.separatorWrap}>
            {/* <View style={styles.separator} /> */}
            {/* <View style={styles.separator} /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
});
// const mapDispatchToProps = {
//   login  
// };

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      login
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
