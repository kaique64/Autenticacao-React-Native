import React, { useState } from 'react';
import { 
    SafeAreaView, 
    KeyboardAvoidingView, 
    Text, 
    StyleSheet, 
    Keyboard, 
    Platform, 
    TouchableOpacity,
    View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import api from '../../services/api';
import colors from '../../colors';
import fonts from '../../fonts';
import Input from '../../components/Input';

interface IRegister {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
    const [error, setError] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm<IRegister>();
    const navigation = useNavigation();
    
    const onSubmit = handleSubmit(async (data) => {
        api.post('/',{ name: data.name, email: data.email, password: data.password })
        .then((res) => {
            navigation.navigate('SignIn');
        })
        .catch((err: AxiosError) => {
            if (err.response?.data === 'Email já cadastrado!') {
                setError(true);
                return;
            }
            setError(false);
        })
    });

    const handleNavigate = () => navigation.navigate('SignIn'); 

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Text style={styles.title}>
                        Cadastre{'\n'}sua conta
                    </Text>
                    {error 
                    && (
                        <View style={styles.warn}>
                            <MaterialIcons name='info' size={25} color={colors.primary_red} />
                            <Text style={styles.errorTxt}> Email já cadastrado! </Text>
                        </View>
                    )}
                    <Input
                        placeholder='Digite seu nome'
                        control={control}
                        label='Nome'
                        name='name'
                        style={[
                            styles.input,
                            errors.name && errors.name !== undefined
                            && { borderBottomColor: colors.primary_red },
                        ]}
                    />
                    {errors?.name 
                    && (
                        <View style={styles.warn}>
                            <MaterialIcons name='info' size={20} color={colors.primary_red} />
                            <Text style={styles.error}> Nome é obrigatório! </Text>
                        </View>
                    )}
                    <Input
                        placeholder='Digite seu email'
                        control={control}
                        label='Email'
                        name='email'
                        style={[
                            styles.input,
                            errors.email && errors.email !== undefined
                            && { borderBottomColor: colors.primary_red },
                        ]}
                    />
                    {errors?.email 
                    && (
                        <View style={styles.warn}>
                            <MaterialIcons name='info' size={20} color={colors.primary_red} />
                            <Text style={styles.error}> Email é obrigatório! </Text>
                        </View>
                    )}
                    <Input
                        placeholder='Digite seu senha'
                        control={control}
                        label='Senha'
                        name='password'
                        secureTextEntry
                        style={[
                            styles.input,
                            errors.password && errors.password !== undefined
                            && { borderBottomColor: colors.primary_red },
                        ]}
                    />
                    {errors?.password 
                    && (
                        <View style={styles.warn}>
                            <MaterialIcons name='info' size={20} color={colors.primary_red} />
                            <Text style={styles.error}> Senha é obrigatória! </Text>
                        </View>
                    )}
                    <View style={styles.btns}>
                        <TouchableOpacity 
                            style={styles.btnRegister}
                            onPress={onSubmit}
                        >
                            <Text style={styles.txt}> Cadastrar </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.signInBtn}
                        onPress={handleNavigate}
                    >
                        <Text style={styles.signInTxt}> Já tem uma conta?</Text>
                        <Text style={styles.signInTitle}> Entre </Text>
                    </TouchableOpacity>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'center',
        marginTop: 175,
        height: 300,
        width: 277,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: { height: 10, width: 10 },
        shadowOpacity: 1.0,
        elevation: 10,
    },
    modalTitle: {
        textAlign: 'left',
        fontSize: 20,
        fontFamily: fonts.bold,
        marginLeft: 10,
    },
    modalTxt: {
        textAlign: 'left',
        fontSize: 15,
        fontFamily: fonts.regular,
        marginLeft: 10,
    },
    btns:{
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
    },
    btnRegister: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary_blue,
        width: 388,
        height: 60,
        borderRadius: 10,
        marginTop: 25
    },
    txt: {
        fontSize: 20,
        fontFamily: fonts.bold,
        color: colors.white,
        textTransform: 'uppercase',
    },
    digitalBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        backgroundColor: colors.primary_blue,
        borderRadius: 10,
        marginLeft: 7,
        marginTop: 25
    },
    title: {
        fontSize: 40,
        fontFamily: fonts.bold,
        marginBottom: 20,
    },
    error: {
        fontSize: 15,
        fontFamily: fonts.medium,
        color: colors.primary_red,
        marginLeft: 5,
    },
    warn: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
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
    signInBtn: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
    },
    signInTxt: {
        fontSize: 15,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    signInTitle: {
        fontSize: 15,
        fontFamily: fonts.bold,
        color: colors.black,
    },
    finishBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 249,
        height: 36,
        backgroundColor: colors.primary_blue,
        borderRadius: 10,
        marginHorizontal: 7,
        marginTop: 15,
    },
    finishTxt: {
        fontSize: 15,
        fontFamily: fonts.bold,
        color: colors.white,
    },
    errorTxt: {
        fontSize: 20,
        fontFamily: fonts.semi_bold,
        color: colors.primary_red,
    },
});


export default Register;
