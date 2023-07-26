import { useRequest } from "ahooks"
import { Get } from "@/utils/request"
import { useEffect } from "react"
import { IDayEnglish } from "./type"
import LoadingApp from "../../components/LoadingApp"

function index() {
	const { data } = useRequest(() => Get<IDayEnglish>({ url: "/getDayEnglish" }))

	useEffect(() => {
		console.log(data)
	}, [data])

	if (!data) {
		return <LoadingApp />
	}

	return (
		<div className="appItem-icon relative bg-slate-800 bg-opacity-60 p-4">
			<img
				src={data.picture2}
				className="full absolute left-0 top-0 z-[-1] object-cover"
			></img>
			<div className="full flex flex-col justify-evenly text-left text-white">
				<p>{data.content}</p>
				<p>{data.note}</p>
			</div>
		</div>
	)
}

export default index
