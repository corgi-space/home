import { Button, Form, Input, message } from "antd"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { useAppDispatch } from "@/store"
import { LoginAction } from "@/store/modules/userStore"
import type { FC } from "react"
import type { ILoginParams } from "@/api/user/types"

const LoginForm: FC = () => {
	const dispatch = useAppDispatch()

	const onFinish = async (values: ILoginParams) => {
		const action = await dispatch(LoginAction(values))

		if (action.type === "user/LoginAction/fulfilled") {
			message.success("登录成功!")
		}
	}

	return (
		<Form
			name="normal_login"
			size="large"
			initialValues={{ account: "lz", password: "12345678" }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item
				name="account"
				rules={[{ required: true, message: "请输入用户名!" }]}
			>
				<Input prefix={<UserOutlined />} placeholder="用户名" />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: "请输入密码!" }]}
			>
				<Input prefix={<LockOutlined />} type="password" placeholder="密码" />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="w-full">
					登 录
				</Button>
			</Form.Item>
		</Form>
	)
}

const Login: FC = () => {
	return (
		<div className="relative h-full w-full bg-gray-700 bg-cover bg-center bg-no-repeat text-center">
			<div className="absolute right-60 top-1/3 w-[400px] rounded bg-white px-6 py-4">
				<h3>登录平台</h3>
				<LoginForm />
			</div>
		</div>
	)
}

export default Login
