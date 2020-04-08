import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from '../../styles/colors';

const Input = props => {
    return (
        <View style={styles.container}>
            <TextInput theme={themeConfig} {...props} style={{ ...styles.input, ...props.style }} />
            {props.error ? <Text style={styles.errorText}>{props.error}</Text> : null}
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        marginVertical: 10,
        backgroundColor: colors.colmenaBackground,
    },
    errorText: {
        color: 'red',
        marginLeft: 10,
    },
});

const themeConfig = {
    colors: {
        placeholder: 'gray',
        text: 'black',
        primary: colors.colmenaGreen,
        underlineColor: '#000'
    }
};

export default Input;
