import { createAppModal } from "../../hooks/CreateAppModal"

const app = createAppModal(
	() => {
		return <div>这是内容</div>
	},
	{
		// something....
	}
)

export default app
