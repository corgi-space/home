import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons"
import { createAppModal } from "../../hooks/CreateAppModal"
import { useRequest, useToggle } from "ahooks"
import { Get } from "@/utils/request"
import { List, Layout } from "antd"
import { init, start, destroyed } from "./game"
import { useEffect } from "react"
import classNames from "./index.module.scss"

const { Sider, Content } = Layout

export const App = () => {
	const [collapsed, { toggle }] = useToggle(true)
	const { data } = useRequest(() =>
		Get<string[]>("/getGameList").then(res => {
			return res.map(item => item.slice(0, item.lastIndexOf(".")))
		})
	)

	const handleClickGame = (gameName: string) => {
		toggle()
		start(import.meta.env.VITE_APP_BASE + `assets/games/${gameName}.nes`)
	}

	useEffect(() => {
		init("game")
		return () => {
			destroyed()
		}
	}, [])

	return (
		<Layout
			className="relative bg-black text-white"
			style={{ fontFamily: "Silkscreen-Regular" }}
		>
			<Sider
				collapsible
				collapsed={collapsed}
				trigger={null}
				collapsedWidth={0}
				width={150}
				className={
					"!absolute left-0 top-0 h-full bg-transparent " +
					(collapsed ? "opacity-50" : "")
				}
			>
				<List
					bordered
					dataSource={data}
					renderItem={item => (
						<List.Item
							className="cursor-pointer whitespace-nowrap text-xs"
							onClick={() => handleClickGame(item)}
						>
							{item}
						</List.Item>
					)}
					className="h-full overflow-y-auto rounded-bl-none rounded-tl-none bg-gray-200"
				/>
				<div
					onClick={() => toggle()}
					className="absolute -right-5 top-1/2 flex h-10 w-5 cursor-pointer items-center justify-center rounded-br-md rounded-tr-md bg-gray-200"
				>
					{collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
				</div>
			</Sider>
			<Content className="flex">
				<canvas
					id="game"
					width="256"
					height="240"
					style={{ width: "512px", height: "480px" }}
					className="mx-auto block py-5"
				></canvas>
				<div className="flex w-[200px] flex-col justify-evenly pr-5 opacity-40 transition-opacity hover:opacity-80">
					<div>
						<p className="mb-5">player1</p>
						<div className="flex items-center justify-between">
							<div>
								<div className="grid grid-cols-3 gap-2">
									<div
										className={classNames.ico_key + " col-start-2 col-end-4"}
										title="上"
									>
										W
									</div>
									<div className={classNames.ico_key} title="左">
										A
									</div>
									<div className={classNames.ico_key} title="下">
										S
									</div>
									<div className={classNames.ico_key} title="右">
										D
									</div>
								</div>
							</div>
							<div className="flex gap-2">
								<div className={classNames.ico_key} title="A">
									J
								</div>
								<div className={classNames.ico_key} title="B">
									K
								</div>
							</div>
						</div>
					</div>
					<div>
						<p className="mb-5">player2</p>
						<div className="flex items-center justify-between">
							<div>
								<div className="grid grid-cols-3 gap-2">
									<div
										className={classNames.ico_key + " col-start-2 col-end-4"}
										title="上"
									>
										↑
									</div>
									<div className={classNames.ico_key} title="左">
										←
									</div>
									<div className={classNames.ico_key} title="下">
										↓
									</div>
									<div className={classNames.ico_key} title="右">
										→
									</div>
								</div>
							</div>
							<div className="flex gap-2">
								<div className={classNames.ico_key} title="A">
									1
								</div>
								<div className={classNames.ico_key} title="B">
									2
								</div>
							</div>
						</div>
					</div>
					<div>
						<p className="mb-5">system</p>
						<div className="flex gap-2">
							<div className={classNames.ico_key} title="选择">
								Tab
							</div>
							<div className={classNames.ico_key} title="确定/暂停">
								Enter
							</div>
						</div>
					</div>
				</div>
			</Content>
		</Layout>
	)
}

export default createAppModal(App, {
	toolTheme: "light",
	hasFull: false
})
