import React from 'react';
import styled from 'styled-components';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  margin: 10px 0;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const CheckboxLabel = styled.label`
  margin-left: 5px;
`;

const Button = styled.button`
  width: 300px;
  height: 40px;
  margin: 20px 0;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;

const SocialLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  font-size: 2rem;
`;

const SocialLoginIcon = styled.div`
  margin: 0 10px;
  cursor: pointer;
`;

const Footer = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
`;

const Link = styled.a`
  margin: 0 10px;
  cursor: pointer;
  text-decoration: none;
  color: #007bff;
`;

const Login = () => {
    return (
        <Container>
            <Title>FanTreeHouse</Title>
            <Input type="text" placeholder="아이디" />
            <Input type="password" placeholder="비밀번호" />
            <CheckboxContainer>
                <input type="checkbox" id="rememberMe" />
                <CheckboxLabel htmlFor="rememberMe">로그인 상태 유지</CheckboxLabel>
            </CheckboxContainer>
            <Button>로그인</Button>
            <SocialLoginContainer>
                <SocialLoginIcon>
                    <FaGoogle />
                </SocialLoginIcon>
                <SocialLoginIcon>
                <FaGithub />
                </SocialLoginIcon>
            </SocialLoginContainer>
            <Footer>
                <Link href="/signup">회원가입</Link>
                <span>|</span>
                <Link href="/contact">문의하기</Link>
                <span>|</span>
                <Link href="/find-id">아이디 찾기</Link>
                <span>|</span>
                <Link href="/find-password">비밀번호 찾기</Link>
            </Footer>
        </Container>
    );
};

export default Login;