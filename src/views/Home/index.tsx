import UserCard from "./components/UserCard"
import TaskCard from "./components/TaskCard"
import MessageCard from "./components/MessageCard"

function Home() {
	return (
		<div
			style={{ cursor: "url('/alternate.cur'), default" }}
			className=" box-border h-full bg-[url('https://n.sinaimg.cn/sinakd10101/600/w1920h1080/20220218/e168-9cfbdc061c67828fb5a639e3369aec57.jpg')] bg-cover bg-center p-4"
		>
			<div className="flex h-[calc(100%-var(--wharf-height)-12px)] justify-between gap-3">
				<div className="flex w-[50%] flex-col  gap-3">
					<UserCard bordered={false} className="glass h-[120px]" hoverable />
					<MessageCard bordered={false} className="glass flex-1" hoverable />
				</div>
				<TaskCard bordered={false} className="glass w-[50%]" hoverable />
				{/* <div className="row-start-auto flex h-full flex-col gap-3"></div>
			<Tools className="h-full" /> */}
			</div>
			{/* <Tools className="mt-3" /> */}
		</div>
	)
}

export default Home
