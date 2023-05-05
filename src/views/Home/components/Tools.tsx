import { Skeleton, Space } from "antd"

function Tools(props: { className: string }) {
	return (
		<div {...props}>
			<Space>
				<Skeleton avatar paragraph={false} title={false} />
				<Skeleton avatar paragraph={false} title={false} />
				<Skeleton avatar paragraph={false} title={false} />
				<Skeleton avatar paragraph={false} title={false} />
			</Space>
		</div>
	)
}

export default Tools
