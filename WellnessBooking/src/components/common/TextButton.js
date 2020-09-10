import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';

const TextButton = ({
  onPress,
  title,
  primary,
  isDisable,
  wrapStyle,
  textStyle
}) => {
  return (
    <TouchableOpacity
      disabled={isDisable}
      onPress={onPress}
      style={[styles.wrap, wrapStyle, primary && styles.primaryWrap]}>
      <Text style={[styles.text, textStyle, primary && styles.primaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 11,
    borderColor: '#989898',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    color: '#989898',
    fontSize: 16,
    lineHeight: 24,
  },
  overlay: {
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  primaryWrap: {
    borderColor: "#00979D",
    backgroundColor: "#00979D"
  },
  primaryText: {
    color: "white"
  }
});

export default TextButton;
