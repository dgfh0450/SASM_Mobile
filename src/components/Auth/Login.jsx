import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View, TextInput, StyleSheet, SafeAreaView } from "react-native";
import styled, { css } from 'styled-components/native';
import { NavigationScreenProp } from 'react-navigation';
import { setNickname, setAccessToken, setRefreshToken } from '../../common/storage';
import { Request } from '../../common/requests'
import { useNavigation } from '@react-navigation/native';
import { MyPageParams } from '../../pages/MyPage';

const SignUpButton = styled.View`
    width: 300px;
    height: 40px;
    border-radius: 10px;
    border-color: #44ADF7;
    background: #44ADF7;
    align-items: center;
    justify-content: center;   
`;

const LoginButton = styled.View`
    width: 150px;
    height: 40px;
    border-width: 2px;
    border-radius: 10px;
    backgroundColor: #FFFFFF;
    align-items: center;
    justify-content: center;
    border-color: #44ADF7;
`;

const LoginInput = styled.TextInput`
    width: 294px;
    height: 32px;
    margin: 12px;
    padding: 5px;
    borderWidth: 1px;
    background: #FFFFFF;
    border-radius: 3px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoginScreen = () => {
    const naviagation = useNavigation();
    const [form, setForm] = useState({
        email: {
            value: '',
            type: 'textInput',
            rules: {},
            valid: false,
        },
        password: {
            value: '',
            type: 'textInput',
            rules: {},
            valid: false,
        },
    });
    const request = new Request();

    updateInput = (name, value) => {
        let formCopy = form;
        formCopy[name].value = value;
        setForm(form => {
            return { ...formCopy };
        });
    };

    login = async () => {
        let response = await request.post('/users/login/',
            {
                email: form['email'].value,
                password: form['password'].value,
            },
            null);
            console.log(response);
        if (response.status == 200) {
            const nickname = response.data.data.nickname
            const accessToken = response.data.data.access
            const refreshToken = response.data.data.refresh
            setNickname(nickname)
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)
            naviagation.navigate('mypage');
        } else {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }

    }

    return (
        <SafeAreaView
            style={
                {
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center'
                }
            }
        >
            <View style={{ marginTop: 100 }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 600,
                    }}
                >LOG IN</Text>
            </View>
            <View style={{ marginTop: 40 }}>
                <LoginInput
                    value={form.email.value}
                    type={form.email.type}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    placeholder="E-mail"
                    placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                    onChangeText={value => updateInput('email', value)}
                />
                <LoginInput
                    value={form.password.value}
                    type={form.password.type}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                    onChangeText={value => updateInput('password', value)}
                />
            </View>
            <View style={{ marginTop: 40 }}>
                <TouchableOpacity onPress={() => login()}>
                    <LoginButton>
                        <Text style={{ fontWeight: 600, fontSize: 12 }}>로그인하기</Text>
                    </LoginButton>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 40 }}>
                <TouchableOpacity onPress={() => navigation.navigate('register')}>
                    <SignUpButton>
                        <Text style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16 }}>회원가입하기</Text>
                    </SignUpButton>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('findidpw')}><Text>아이디/비밀번호 찾기</Text></TouchableOpacity>
        </SafeAreaView>)
}

export default LoginScreen;