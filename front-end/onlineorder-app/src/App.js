import React, {useState} from "react";
import {Layout, Typography} from "antd";
import LoginForm from './components/LoginForm'
import SignupForm from "./components/SignupForm";
import FoodList from "./components/FoodList";
import MyCart from "./components/MyCart";
import './App.css';
import Background from './asset/background.jpg';

const {Header, Content, Footer} = Layout;
const {Title} = Typography;

function App() {
    const [authed, setAuthed] = useState(false);

    return (
        <Layout style={{height: "100vh", backgroundImage: `url(${Background})`}}>
            <Header>
                <div className="header">
                    <Title
                        level={2}
                        style={{color: "white", lineHeight: "inherit", marginBottom: 0}}
                    >
                        Online Order
                    </Title>
                    <div>{authed ? <MyCart onLogout={() => setAuthed(false)}/> : <SignupForm/>}</div>
                </div>
            </Header>
            <Content style={{
                padding: '50px',
                maxHeight: "calc(100% - 64px)",
                overflowY: "auto",
            }
            }>
                {authed ? (
                    <FoodList/>
                ) : (
                    <LoginForm onSuccess={() => setAuthed(true)}/>
                )}
            </Content>
            <Footer style={{textAlign: 'center', color: 'white', background: '#001529'}}>
                Online Order ©2021 Created by Shaoshuai Xu
            </Footer>
        </Layout>
    );
}

export default App;
