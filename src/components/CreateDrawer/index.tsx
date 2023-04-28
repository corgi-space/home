import {
	ReactNode,
	Ref,
	forwardRef,
	memo,
	useImperativeHandle,
	useState
} from "react"
import { Drawer, DrawerProps } from "antd"

const defaultProps: DrawerProps = {
	title: "编辑",
	width: "400px",
	placement: "right",
	destroyOnClose: true
}

export interface DrawerRef<T = unknown> {
	open: (_options?: T) => void
}

type IOnClose = () => void | boolean | Promise<boolean>

/**
 * A => props
 * T => options
 * @param children
 * @param drawerProps
 */
function createDrawer<A = unknown, T = unknown>(
	children: ({
		props,
		options,
		handle
	}: {
		props: A
		options: T | undefined
		handle: {
			close: () => void
			onClose: (o: IOnClose) => void
			setTitle: (o: ReactNode) => void
			setExtra: (o: ReactNode) => void
		}
	}) => JSX.Element,
	drawerProps?: DrawerProps
) {
	const ChildrenComponent = memo(children)

	const CDrawer = (_: A, ref: Ref<DrawerRef<T>> | undefined) => {
		const [drawerStatus, setDrawerStatus] = useState(false)
		const [options, setOptions] = useState<T>()
		const [title, setTitle] = useState<ReactNode>(
			drawerProps?.title || defaultProps.title
		)
		const [extra, setExtra] = useState<ReactNode>()
		drawerProps = Object.assign({}, defaultProps, drawerProps)

		const open = (_options?: T) => {
			setOptions(_options)
			setDrawerStatus(true)
		}

		let beforeClose: IOnClose | null = null

		/**
		 * 关闭事件
		 *
		 * 先执行 传入的 beforeClose
		 *
		 * 关闭抽屉，并 初始化 options
		 */
		async function _onClose() {
			let res
			if (beforeClose) {
				res = await beforeClose()
			}
			if (res !== false) {
				setDrawerStatus(false)
				setOptions(undefined)
			}
		}

		function close() {
			setDrawerStatus(false)
		}

		function onClose(_beforeClose: IOnClose) {
			beforeClose = _beforeClose
		}

		useImperativeHandle(ref, () => ({
			open
		}))

		return (
			<Drawer
				{...drawerProps}
				title={title}
				extra={extra}
				onClose={_onClose}
				open={drawerStatus}
			>
				<ChildrenComponent
					props={_}
					options={options}
					handle={{ close, onClose, setTitle, setExtra }}
				/>
			</Drawer>
		)
	}

	return forwardRef<DrawerRef<T>, A>(CDrawer)
}

export default createDrawer
