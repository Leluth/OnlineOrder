import React from "react";
import {Layout, Typography} from "antd";
import {useState} from "react";
import LoginForm from './components/LoginForm'
import './App.css';

const {Header, Content, Footer} = Layout;
const {Title} = Typography;

function App() {
    const [authed, setAuthed] = useState(false);

    return (
        <Layout style={{height: "100vh"}}>
            <Header>
                <div className="header">
                    <Title
                        level={2}
                        style={{color: "white", lineHeight: "inherit", marginBottom: 0}}
                    >
                        Online Order
                    </Title>
                </div>
            </Header>
            <Content style={{
                padding: '50px',
                maxHeight: "calc(100% - 64px)",
                overflowY: "auto",
            }
            }>
                {authed ? (
                    <div>content placeholder</div>
                ) : (
                    <LoginForm onSuccess={() => setAuthed(true)} />
                )}
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Online Order ©2021 Created by Shaoshuai Xu
            </Footer>
        </Layout>
    );
}

export default App;
