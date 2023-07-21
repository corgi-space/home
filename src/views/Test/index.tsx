import NavList from "@/layout/components/Sider/NavList"

const HexagonalMesh1 = () => {
	const list = new Array(20).fill("和")
	return (
		<>
			<div className="flex h-[100px] w-[50px] flex-col justify-center overflow-auto">
				{list.map((item, index) => (
					<div key={index}>
						{item} + {index}
					</div>
				))}
			</div>
			<iframe
				src="//player.bilibili.com/player.html?aid=752844614&bvid=BV1ik4y1R7gR&cid=178608493&page=1"
				scrolling="no"
				border="0"
				frameBorder="no"
				framespacing="0"
				allowfullscreen="true"
			>
				{" "}
			</iframe>
		</>
	)
}

export default HexagonalMesh1
