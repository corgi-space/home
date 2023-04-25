import System from "./modules/system"
import Course from "./modules/course"
import Belong from "./modules/belong"
import Class from "./modules/class"
import Distribution from "./modules/distribution"
import User from "./modules/user"
import Activity from "./modules/activity"
import Order from "./modules/order"
import Complete from "./modules/complete"
import Invoice from "./modules/invoice"
import Feedback from "./modules/feedback"
import type { IRouteObject } from "@/types"

export function getRouterArray(): IRouteObject[] {
	return [
		System,
		Course,
		Belong,
		Class,
		Distribution,
		User,
		Activity,
		Order,
		Complete,
		Invoice,
		Feedback
	]
}
