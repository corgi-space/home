import { useRequest } from "ahooks"
import { Get } from "@/utils/request"
import { useEffect } from "react"

function index() {
	const { data } = useRequest(() => Get({ url: "/getDayEnglish" }))

	useEffect(() => {
		console.log("隐喻", data)
	}, [])

	return <div className="appItem-icon">英语</div>
}

export default index
