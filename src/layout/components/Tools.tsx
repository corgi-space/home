import { Dropdown, Space } from "antd"
import { DownOutlined, GithubOutlined } from "@ant-design/icons"
import { useAppSelector } from "@/store"

const items = [
	{
		key: "change",
		label: "个人信息"
	},
	{
		key: "logged",
		danger: true,
		label: "退出登录"
	}
]

function Tools() {
	const { userInfo } = useAppSelector(state => state.userStore)

	return (
		<Space align="center">
			<GithubOutlined />

			<Dropdown
				menu={{ items }}
				placement="bottom"
				arrow={{ pointAtCenter: true }}
			>
				<a className="cursor-pointer text-[var()]">
					<Space align="center">
						<img
							src="/default_photo.gif"
							alt=""
							className="h-10 w-10 align-middle"
						/>
						{userInfo?.userName}
						<DownOutlined />
					</Space>
				</a>
			</Dropdown>
		</Space>
	)
}

export default Tools
