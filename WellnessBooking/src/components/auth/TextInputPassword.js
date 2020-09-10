import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

const _TextInputPassword = ({
  label,
  placeholder,
  onChange,
  wrapStyle,
  maxLength,
  secureTextEntry,
  textInputStyle,
  labelStyle,
  errorText,
  onBlur,
  defaultValue,
  onSubmitEditing,
  onFocus,
  editable,
  keyboardType,
  value,
  autoFocus,
  multiline
}) => {
  const errorStyle = !!errorText && styles.errorWrap;

  const [visible, setVisibility] = useState(true);
  const icon = !visible ? 'eyeo' : 'eye';

  return (
    <View style={[styles.wrap, wrapStyle]}>
      {!!label &&
        (typeof label === 'string' || typeof label === 'number' ? (
          <Text style={labelStyle}>{label}</Text>
        ) : (
            label
          ))}
      <View>
        <TextInput
          placeholderTextColor={'#909090'}
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          autoCorrect={false}
          autoFocus={autoFocus}
          maxLength={maxLength}
          secureTextEntry={visible}
          style={[styles.textInput, textInputStyle, errorStyle]}
          placeholder={placeholder}
          onChangeText={onChange}
          defaultValue={defaultValue}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          onFocus={onFocus}
          value={value}
          editable={editable}
          keyboardType={keyboardType}
          multiline={multiline}
          {...(value ? { value } : {})}
        />
      </View>
      {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: 20
  },
  textInput: {
    marginTop: 7,
    borderRadius: 2,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    // ...Theme.shadow,
    shadowColor: '#ccc',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    color: '#262626'
  },
  errorText: {
    color: '#F10303',
    fontSize: 12,
    fontWeight: 'bold'
  },
  errorWrap: {
    borderColor:'#F10303',
    borderWidth: 1
  },

  icons: {
    position: 'absolute',
    right: 0,
    top: 7,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default _TextInputPassword;
