import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wave from '../../images/Wave';
import Thanks from '../../images/Thanks';
import colors from '../../colors';
import api from '../../services/api';
import fonts from '../../fonts';
import { useNavigation } from '@react-navigation/native';

const Acknowledgment = () => {
    const [name, setName] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                return;
            }

            api.defaults.headers.authorization = `Bearer ${token}`;

            const { data } = await api.get('/authenticated');
            setName(data.name);
        })();
    }, []);

    const handleLogout = () => {
        AsyncStorage.removeItem('token');
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.container}>
            <Wave />
            <Thanks />
            <Text style={styles.title}>Obrigado{'\n'}por acessar</Text>
            {name !== '' ? (
                <Text style={styles.text}>{name}, agradeço por{'\n'}acessar o aplicativo!</Text>
            ) : (
                <Text style={styles.text}>Agradeço por{'\n'}acessar o aplicativo!</Text>
            )}
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutTxt}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        fontFamily: fonts.bold,
        color: colors.black,
        textAlign: 'center',
    },
    text: {
        fontSize: 20,
        fontFamily: fonts.regular,
        color: colors.black,
        textAlign: 'center',
        marginTop: 14,
        marginBottom: 28,
    },
    logoutBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 210,
        height: 60,
        backgroundColor: colors.secondary_red,
        borderRadius: 10,
        marginBottom: 51
    },
    logoutTxt: {
        fontSize: 20,
        fontFamily: fonts.bold,
        color: colors.white,
        textTransform: 'uppercase',
    }
});

export default Acknowledgment;
