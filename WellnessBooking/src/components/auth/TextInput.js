import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
const _TextInput = ({
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
  extraText,
  autoFocus,
  multiline,
  selectionColor
}) => {
  const errorStyle = !!errorText && styles.errorWrap;
  return (
    <View style={[styles.wrap, wrapStyle]}>
      {!!label &&
        (typeof label === 'string' || typeof label === 'number' ? (
          <Text style={labelStyle}>{label}</Text>
        ) : (
          label
        ))}
      <TextInput
        placeholderTextColor={'#909090'}
        autoCapitalize={'none'}
        autoCompleteType={'off'}
        autoCorrect={false}
        autoFocus={autoFocus}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
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
        selectionColor={selectionColor}
        {...(value ? { value } : {})}
      />
      {extraText && extraText}
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
    shadowColor: '#ccc',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    color: '#262626'
  },
  errorText: {
    color:  '#F10303',
    fontSize: 12,
    fontWeight: 'bold'
  },
  errorWrap: {
    borderColor: '#F10303',
    borderWidth: 1
  }
});

export default _TextInput;
