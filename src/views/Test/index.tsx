const Item = ({ content }: { content: string }) => {
	console.log(content)
	return <p>{content}</p>
}

const HexagonalMesh1 = () => {
	const list = new Array(20).fill("和")
	return (
		<>
			<div className="flex h-[100px] w-[50px] flex-col justify-center overflow-auto">
				{list.map((item, index) => (
					<Item key={index} content={item + index} />
				))}
			</div>
		</>
	)
}

export default HexagonalMesh1
