import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginForm } from '../../api';

function Login(props) {
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = values => {
    props.login(values);
  };

  useEffect(() => {
    if (props.token) {
      history.push('/');
    }
  }, [props.token, history]);

  useEffect(() => {
    if (form) {
      const tempForm = { username: 'admin', password: '123456' }; // admin 账号
      // const tempForm = { username: 'editor', password: '123456' }; // editor 账号
      form.setFieldsValue(tempForm);
    }
  }, [form]);

  return (
    <div className="form-container">
      <Form form={form} name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.loginReducer.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    async login(form) {
      const result = await loginForm(form);
      if (!result.length) {
        message.error('Username or Password error!');
        return;
      }
      dispatch({ type: 'USER_LOGIN', payload: result });
      dispatch({ type: 'SET_USER_INFO', payload: result });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
