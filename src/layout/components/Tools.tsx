import { Dropdown, Space } from "antd"
import { DownOutlined, GithubOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import useUserStore from "@/store/userStore"
import MessageBox from "./MessageBox"
import Setting from "./Setting"

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
	const { userInfo, clear } = useUserStore()

	const onClick: MenuProps["onClick"] = ({ key }) => {
		switch (key) {
			case "info":
				break
			case "logged":
				clear()
				break
		}
	}

	return (
		<Space size="middle" align="center">
			<a
				href="https://github.com/xluoyu/corgi-space"
				target="__blank"
				style={{ fontSize: "18px" }}
				className="px-2 text-black"
			>
				<GithubOutlined />
			</a>

			<Setting />

			<MessageBox />

			<Dropdown
				menu={{ items, onClick }}
				placement="bottom"
				arrow={{ pointAtCenter: true }}
			>
				<a className="cursor-pointer text-black">
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
