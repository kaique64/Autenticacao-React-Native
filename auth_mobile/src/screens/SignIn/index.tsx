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
    Modal,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as LocalAuthentication from 'expo-local-authentication';
import { MaterialIcons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sucess from '../../images/Sucess';
import Wave from '../../images/Wave';
import colors from '../../colors';
import fonts from '../../fonts';
import Input from '../../components/Input';
import api from '../../services/api';
import { AxiosError } from 'axios';

interface ISignIn {
    email: string;
    password: string;
}

const SignIn = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<ISignIn>();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const navigation = useNavigation();

    const onSubmit = handleSubmit((data) => {
        api.post('/auth', { email: data.email, password: data.password })
        .then(async (res) => {
            const token = res.data.token;
            await AsyncStorage.setItem('token', token);
            
            setOpen(true);
            setError(false);
        })
        .catch((err: AxiosError) => {
            if (err.response?.data === 'Email não encontrado!') {
                setError(true);
                return;
            } else if (err.response?.data === 'Senha incorreta!') {
                setError(true);
                return;
            }
            setError(false);
        });
    });

    const handleNavigate = () => navigation.navigate('Register'); 

    const handleAuthentication = async () => {
        const password = await LocalAuthentication.isEnrolledAsync();

        if (!password) return;

       const response = await LocalAuthentication.authenticateAsync();
       if (response.success) {
           setOpen(true);
           AsyncStorage.removeItem('token');
        } else {
            alert('Erro');
            setOpen(false);
        }
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView 
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <Wave />
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Text style={styles.title}>
                            Entre na{'\n'}sua conta
                        </Text>
                        {error && (
                            <View style={styles.warn}>
                                <MaterialIcons name='info' size={25} color={colors.primary_red} />
                                <Text style={styles.errorTxt}> Email ou senha incorreto! </Text>
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
                                error && { borderBottomColor: colors.primary_red },
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
                                error && { borderBottomColor: colors.primary_red },
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
                                style={styles.btnSignIn}
                                onPress={onSubmit}
                            >
                                <Text style={styles.txt}> Entrar </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.digitalBtn}
                                onPress={handleAuthentication}
                            >
                                <MaterialIcons name='fingerprint' size={42} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.registerBtn}
                            onPress={handleNavigate}
                        >
                            <Text style={styles.registerTxt}> Não tem uma conta?</Text>
                            <Text style={styles.registerTitle}> Cadastre-se </Text>
                        </TouchableOpacity>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
            {open ? (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={open}
                >
                    <View style={styles.modalContainer}>
                        <Sucess />
                        <Text style={styles.modalTitle}>
                            Seja bem-vindo!
                        </Text>
                        <Text style={styles.modalTxt}>
                            Sua autenticação foi realizada {'\n'}com sucesso
                        </Text>
                        <TouchableOpacity 
                            style={styles.finishBtn}
                            onPress={() => {
                                navigation.navigate('Thanks');
                                reset();
                                setOpen(false);
                            }}
                        >
                            <Text style={styles.finishTxt}> CONCLUIR </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btns:{
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
    },
    btnSignIn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary_blue,
        width: 326,
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
        marginTop: 25,
    },
    title: {
        fontSize: 40,
        fontFamily: fonts.bold,
        marginBottom: 20,
        marginTop: 12,
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
    registerBtn: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        marginBottom: 63,
    },
    registerTxt: {
        fontSize: 15,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    registerTitle: {
        fontSize: 15,
        fontFamily: fonts.bold,
        color: colors.black,
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
        shadowColor: '#848484',
        shadowOffset: { height: 10, width: 10 },
        shadowOpacity: 10,
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

export default SignIn;
