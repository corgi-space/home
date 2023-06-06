import UserCard from "./components/UserCard"
import TaskCard from "./components/TaskCard"
import Tools from "./components/Tools"
import MessageCard from "./components/MessageCard"

function Home() {
	return (
		<>
			<div className="flex h-[calc(100%-var(--wharf-height)-12px)] justify-between gap-3">
				<div className="flex w-[50%] flex-col  gap-3">
					<UserCard bordered={false} className="glass h-[120px]" hoverable />
					<MessageCard bordered={false} className="glass flex-1" hoverable />
				</div>
				<TaskCard bordered={false} className="glass w-[50%]" hoverable />
				{/* <div className="row-start-auto flex h-full flex-col gap-3"></div>
			<Tools className="h-full" /> */}
			</div>
			<Tools className="mt-3" />
		</>
	)
}

export default Home
