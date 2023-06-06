import { List, Badge, Button } from "antd"
import { GetNoticeList } from "@/api/system"
import { useState, useEffect, useContext } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Skeleton, Divider } from "antd/es"
import { INoticeItem } from "@/api/system/types"
import { PlusOutlined } from "@ant-design/icons"
import Auth from "@/components/Auth"
import { MessageContext } from "."

const TitleItem = ({
	read,
	children
}: {
	read: boolean
	children: string | JSX.Element
}) => {
	const readClassName = read ? "text-gray-400" : ""
	return (
		<span className={readClassName + "group-hover:text-theme-color"}>
			{children}
		</span>
	)
}

function NoticeList() {
	const [data, setData] = useState<INoticeItem[]>([])
	const [page, setPage] = useState(1)
	const [total, setTotal] = useState(0)
	const messageHandle = useContext(MessageContext)

	const getList = async () => {
		const res = await GetNoticeList({
			size: 8,
			page
		})
		const { list, total } = res.data
		setData([...data, ...list])
		setTotal(total)
	}

	useEffect(() => {
		getList()
	}, [page])

	return (
		<div className="w-[300px]">
			<Auth roles={[1, 2]}>
				<Button
					size="small"
					className="mb-2 w-full"
					icon={<PlusOutlined />}
					type="primary"
					ghost
					onClick={() => messageHandle?.openDrawer("create")}
				>
					添加通知
				</Button>
			</Auth>

			<div className="max-h-[400px] overflow-y-auto">
				<InfiniteScroll
					dataLength={data.length}
					next={() => setPage(page + 1)}
					hasMore={data.length < total}
					loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
					endMessage={<Divider plain>没有更多了</Divider>}
					scrollableTarget="scrollableDiv"
				>
					<List
						itemLayout="horizontal"
						dataSource={data}
						renderItem={item => (
							<List.Item
								className="group cursor-pointer"
								onClick={() => messageHandle?.openDrawer("view", item.id)}
							>
								<List.Item.Meta
									title={
										item.read ? (
											<TitleItem read={item.read}>{item.title}</TitleItem>
										) : (
											<Badge
												color="pink"
												dot
												text={
													<TitleItem read={item.read}>{item.title}</TitleItem>
												}
											/>
										)
									}
									description={item.createTime}
								/>
							</List.Item>
						)}
					/>
				</InfiniteScroll>
			</div>
		</div>
	)
}

export default NoticeList
