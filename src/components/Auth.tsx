import useUserStore from "@/store/userStore"
import { isArray } from "lodash-es"

type IType = "out" | "in"

const isAuthorization = (role: number, roles: number[], type: IType) => {
	if (type == "in") {
		return roles.some(e => e == role)
	} else {
		return roles.every(e => e != role)
	}
}

/**
 * 权限判断
 */
function Auth(props: {
	/**
	 * 待判断的角色ID
	 */
	roles?: number | number[]
	/**
	 * in => 仅包含的显示；out => 包含的不显示
	 */
	type?: IType
	children: JSX.Element
}) {
	const { userInfo } = useUserStore()

	if (props.roles) {
		let roles

		if (isArray(props.roles)) {
			roles = props.roles
		} else {
			roles = [props.roles]
		}

		const res = isAuthorization(userInfo!.roleId, roles, props.type || "in")

		if (!res) {
			return null
		}
	}

	return props.children
}

export default Auth
