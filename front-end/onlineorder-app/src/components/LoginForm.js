import React, {Component} from 'react';
import {Button, Form, Input, message, Space} from "antd";
import {LockOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import {login} from "../utils";

class LoginForm extends Component {
    state = {
        loading: false,
    };

    formRef = React.createRef();

    onFinish = (data) => {
        this.setState({
            loading: true,
        });
        login(data)
            .then(() => {
                message.success(`Login Successfully`);
                this.props.onSuccess();
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                this.setState({
                    loading: false,
                });
            });
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };

    render() {
        return (
            <Form
                name="normal_login"
                ref={this.formRef}
                onFinish={this.onFinish}
                style={{
                    width: 400,
                    margin: "auto",
                }}
            >
                <div style={{textAlign: 'center', fontSize: '80px', marginTop: "20%"}}>
                    <ShoppingCartOutlined/>
                </div>
                <Form.Item
                    name="username"
                    rules={[{required: true, message: "Please input your Username!"}]}
                >
                    <Input size="large" prefix={<UserOutlined/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: "Please input your Password!"}]}
                >
                    <Input.Password size="large" prefix={<LockOutlined/>} placeholder="Password"/>
                </Form.Item>

                <Form.Item style={{textAlign: 'center'}}>
                    <Space size="large">
                        <Button size="large" type="primary" htmlType="submit" shape="round"
                                loading={this.state.loading}>
                            Login
                        </Button>
                        <Button size="large" htmlType="button" shape="round" onClick={this.onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        );
    }
}

export default LoginForm;