import { useRequest } from "ahooks"
import { Get } from "@/utils/request"
import { useEffect } from "react"

function index() {
	// const { data } = useRequest(() =>
	// 	Get({ url: "https://open.iciba.com/dsapi/" })
	// )

	useEffect(() => {
		console.log("隐喻")
	}, [])

	return <div className="appItem-icon">英语</div>
}

export default index
