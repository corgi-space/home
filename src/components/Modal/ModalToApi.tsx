import { store } from "@/store"
import { getThemeConfig } from "@/styles/styles"
import { ConfigProvider, Modal } from "antd"
import {
	forwardRef,
	memo,
	useImperativeHandle,
	useState,
	ReactNode
} from "react"
import { Root, createRoot } from "react-dom/client"
import zhCN from "antd/lib/locale/zh_CN"

type IImportComp<IO, IR> = ({
	options,
	handle
}: {
	options: IOPtionsWithHandle<IO>
	handle: {
		setTitle: (e: ReactNode) => void
		onOk: (e: () => IR) => void
		beforeOk: (
			e: () => boolean | void | Promise<Boolean> | Promise<void>
		) => void
	}
}) => JSX.Element

type IOPtionsWithHandle<T> = T & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_onOk: (e: any) => void
	_onCancel: () => void
}

interface IHandle {
	title: string
	/**
	 * 销毁延迟
	 * 默认1.5s后销毁弹框
	 */
	delay: number
	width?: string | number | undefined
	zIndex: number
	destroyOnClose: boolean
}

const defaltOptions = {
	delay: 1500,
	title: "提示",
	zIndex: 1000,
	destroyOnClose: true
} as IHandle

const createModal = <IO, IR>(
	children: IImportComp<IO, IR>,
	control: Omit<IHandle, "delay">
) => {
	const Children = memo(children)

	const customModal = (_, ref) => {
		const { theme } = store.getState().appStore
		const themeConfig = getThemeConfig(theme)
		const [isModalOpen, setIsModalOpen] = useState(false)
		const [options, setOptions] = useState<IOPtionsWithHandle<IO>>()
		const [title, setTitle] = useState<ReactNode>(control.title)
		let okFunc: Function | null = null
		let beforeOkFunc: Function | null = null
		const onOk = (fn: Function) => {
			okFunc = fn
		}

		const beforeOk = (fn: Function) => {
			beforeOkFunc = fn
		}

		const handleOk = async () => {
			if (beforeOkFunc) {
				const res = await beforeOkFunc()

				if (res === false) return
			}

			if (options) {
				options._onOk(okFunc && okFunc())
			}
			setIsModalOpen(false)
		}

		const handleCancel = () => {
			options?._onCancel()
			setIsModalOpen(false)
		}

		const open = (_options: IOPtionsWithHandle<IO>) => {
			setOptions(_options)
			setIsModalOpen(true)
		}

		useImperativeHandle(ref, () => ({
			open
		}))

		return (
			<ConfigProvider locale={zhCN} theme={themeConfig}>
				<Modal
					maskClosable={false}
					width={control.width}
					title={title}
					destroyOnClose={control.destroyOnClose}
					zIndex={control.zIndex}
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					bodyStyle={{ marginTop: "20px", marginBottom: "20px" }}
				>
					<Children options={options!} handle={{ setTitle, onOk, beforeOk }} />
				</Modal>
			</ConfigProvider>
		)
	}

	return customModal
}

/**
 * 已函数的形式封装 Modal
 * @param children
 * @param _options
 */
const ModalToApi = <IO, IR>(
	children: IImportComp<IO, IR>,
	_options?: Partial<IHandle>
) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let holder: any, root: Root

	const control: IHandle = Object.assign({}, defaltOptions, _options)

	function unmount() {
		root && root.unmount()
		if (holder) {
			holder = undefined
		}
	}

	/**
	 * 卸载任务
	 *
	 * 在弹框关闭的一定时间后，卸载所有组件
	 */
	const unmontTask: {
		delay: number
		timer: NodeJS.Timeout | null
		pause: () => void
		start: () => void
	} = {
		delay: control.delay,
		timer: null,
		pause() {
			if (this.timer) {
				clearTimeout(this.timer)
				this.timer = null
			}
		},
		start() {
			if (this.delay && !control.destroyOnClose) {
				this.timer = setTimeout(unmount, this.delay)
			}
		}
	}

	const Comp = forwardRef(createModal(children, control))

	return (options?: IO): Promise<IR | null> => {
		unmontTask.pause()

		return new Promise(resolve => {
			const openRun = () => {
				if (holder) {
					holder.open({
						...options,
						_onOk: (value: IR) => {
							unmontTask.start()
							resolve(value)
						},
						_onCancel: () => {
							unmontTask.start()
							resolve(null)
						}
					})
				} else {
					Promise.resolve().then(() => {
						openRun()
					})
				}
			}

			if (!holder) {
				const holderFragment = document.createDocumentFragment()
				root = createRoot(holderFragment)

				root.render(
					<Comp
						ref={node => {
							Promise.resolve().then(() => {
								if (!holder && node) {
									holder = node
									openRun()
								}
							})
						}}
					/>
				)
			} else {
				openRun()
			}
		})
	}
}

export default ModalToApi
