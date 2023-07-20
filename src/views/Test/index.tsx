import NavList from "@/layout/components/Sider/NavList"

const HexagonalMesh1 = () => {
	const list = new Array(20).fill("和")
	return (
		<div className="flex h-[100px] w-[50px] flex-col justify-center overflow-auto">
			{list.map((item, index) => (
				<div key={index}>
					{item} + {index}
				</div>
			))}
		</div>
	)
}

export default HexagonalMesh1
