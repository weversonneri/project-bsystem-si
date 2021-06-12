import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather as Icon } from '@expo/vector-icons';
import { styles } from './styles';

export function Input(props) {
  const [isFocused, setIsFocused] = useState(false);

  function handleInpuFocus() {
    setIsFocused(true);
  }

  const {
    icon,
    field: {
      name, onBlur, onChange, value,
    },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];
  const noError = !errors[name] && touched[name];

  return (
    <>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputIsFocused,
          hasError && styles.errorInput,
        ]}
      >
        <Icon
          name={icon}
          style={[
            styles.icon,
            isFocused && styles.iconIsFocused,
            hasError && styles.errorIcon,
            noError && styles.succsessIcon,
          ]}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
            setIsFocused(false);
          }}
          onFocus={handleInpuFocus}
          numberOfLines={1}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
        />
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
}
