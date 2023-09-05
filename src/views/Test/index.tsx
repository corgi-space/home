import "./test.scss"

function index() {
	const list = new Array(100).fill(0)
	return (
		<div className="mx-auto h-[600px] w-[800px] py-5">
			<div className="ggg">
				{list.map((_, index) => (
					<span key={index} className="block h-[60px] w-[60px] bg-gray-300">
						{index}
					</span>
				))}
			</div>
		</div>
	)
}

export default index
