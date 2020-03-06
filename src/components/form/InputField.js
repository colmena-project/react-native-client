import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import colors from '../../styles/colors';

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureInput: !(props.inputType === 'text' || props.inputType === 'email'),
      scaleCheckmarkValue: new Animated.Value(0),
      inputValue: props.defaultValue,
      isFocused: false,
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  scaleCheckmark(value) {
    Animated.timing(this.state.scaleCheckmarkValue, {
      toValue: value,
      duration: 400,
      easing: Easing.easeOutBack,
    }).start();
  }

  toggleShowPassword() {
    this.setState({secureInput: !this.state.secureInput});
  }

  onChangeText(text) {
    this.props.onChangeText(text);
    this.setState({inputValue: text});
  }

  onFocus = () => {
    this.setState({isFocused: true});
  };
  onBlur = () => {
    this.setState({isFocused: false});
  };

  render() {
    const {
      labelText,
      labelTextSize,
      labelTextWeight,
      labelColor,
      textColor,
      borderBottomColor,
      borderFocusColor,
      inputType,
      customStyle,
      inputStyle,
      onChangeText,
      showCheckmark,
      autoFocus,
      autoCapitalize,
      placeholder,
      defaultValue,
    } = this.props;
    const {secureInput, scaleCheckmarkValue, inputValue} = this.state;
    const fontSize = labelTextSize || 14;
    const fontWeight = labelTextWeight || '400';
    const color = labelColor || colors.white;
    const inputColor = textColor || colors.white;

    const borderBottom = borderBottomColor || 'transparent';
    const borderFocus = borderFocusColor || 'transparent';

    const keyboardType = inputType === 'email' ? 'email-address' : 'default';
    const customInputStyle = inputStyle || {};
    if (!inputStyle || (inputStyle && !inputStyle.paddingBottom)) {
      customInputStyle.paddingBottom = 5;
    }

    const iconScale = scaleCheckmarkValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.01, 1.6, 1],
    });

    const scaleValue = showCheckmark ? 1 : 0;
    this.scaleCheckmark(scaleValue);

    return (
      <View style={[customStyle, styles.wrapper]}>
        <Text style={[{fontWeight, color, fontSize}, styles.label]}>
          {labelText}
        </Text>
        {inputType === 'password' ? (
          <TouchableOpacity
            style={styles.showButton}
            onPress={this.toggleShowPassword}>
            <Text style={styles.showButtonText}>
              {secureInput ? 'Mostrar' : 'Ocultar'}
            </Text>
          </TouchableOpacity>
        ) : null}
        <Animated.View
          style={[{transform: [{scale: iconScale}]}, styles.checkmarkWrapper]}>
          <Icon name="check" color={colors.colmenaGreen} size={20} />
        </Animated.View>
        <TextInput
          style={[
            {
              color: inputColor,
              borderBottomColor: this.state.isFocused
                ? borderFocus
                : borderBottom,
            },
            inputStyle,
            styles.inputField,
          ]}
          secureTextEntry={secureInput}
          onChangeText={this.onChangeText}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          defaultValue={inputValue}
          value={inputValue}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
        />
      </View>
    );
  }
}

InputField.propTypes = {
  labelText: PropTypes.string.isRequired,
  labelTextSize: PropTypes.number,
  labelColor: PropTypes.string,
  textColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  customStyle: PropTypes.object,
  onChangeText: PropTypes.func,
  showCheckmark: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool,
  autoCapitalize: PropTypes.bool,
  labelTextWeight: PropTypes.string,
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
  label: {
    marginBottom: 5,
    fontFamily: 'Montserrat-Medium',
  },
  inputField: {
    borderBottomWidth: 1,
    paddingTop: 5,
    fontFamily: 'Montserrat-Medium',
  },
  showButton: {
    position: 'absolute',
    right: 0,
  },
  showButtonText: {
    color: colors.colmenaOtherGreen,
    fontWeight: '600',
    fontFamily: 'Montserrat-Medium',
  },
  checkmarkWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 12,
  },
});
