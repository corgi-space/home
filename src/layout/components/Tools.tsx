import { Dropdown, Space } from "antd"
import { DownOutlined, GithubOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import useUserStore from "@/store/userStore"

const items: MenuProps["items"] = [
	{
		key: "change",
		label: "个人信息"
	},
	{
		type: "divider"
	},
	{
		key: "logged",
		danger: true,
		label: "退出登录"
	}
]

function Tools() {
	const { userInfo } = useUserStore()

	return (
		<Space size="large" align="center">
			<a
				href="https://github.com/xluoyu/corgi-space"
				target="__blank"
				style={{ fontSize: "18px" }}
			>
				<GithubOutlined />
			</a>

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
