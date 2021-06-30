import React from 'react';
import { View, Text, StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useController } from 'react-hook-form';
import colors from '../../colors';
import fonts from '../../fonts';

interface IInput extends TextInputProps {
    label: string;
    placeholder: string;
    control: any;
    name: string;
}

const Input = ({ name, control, label, placeholder, ...rest }: IInput) => {
    const { field } = useController({
        control,
        defaultValue: '',
        name,
        rules: { required: true },
    });
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}> {label} </Text>
            <TextInput 
                value={field.value}
                onChangeText={field.onChange}
                placeholder={placeholder}
                style={styles.input}
                {...rest}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    input: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderBottomColor: colors.black,
        borderBottomWidth: 3,
        borderLeftColor: '#fff',
        borderRightColor: '#fff',
        borderTopColor: '#fff',
        height: 63,
        width: 388,
        fontSize: 20,
        fontFamily: fonts.regular,
        marginTop: 9,
        // marginBottom: 40,
        paddingLeft: 20
    },
    label: {
        fontSize: 20,
        fontFamily: fonts.semi_bold,
        marginTop: 15
    },
});

export default Input;
