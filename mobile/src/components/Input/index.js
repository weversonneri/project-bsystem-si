import React from 'react';
import { Text, TextInput } from 'react-native';

import { styles } from './styles';

export function Input(props) {
  const {
    field: {
      name, onBlur, onChange, value,
    },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        style={[
          styles.input,
          hasError && styles.errorInput,
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
}
