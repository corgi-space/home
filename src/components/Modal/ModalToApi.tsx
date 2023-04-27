import useAppStore from "@/store/appStore"
import { getThemeConfig } from "@/styles/theme"
import { ConfigProvider, Modal } from "antd"
import {
	forwardRef,
	memo,
	useImperativeHandle,
	useState,
	ReactNode,
	Ref
} from "react"
import { Root, createRoot } from "react-dom/client"
import zhCN from "antd/lib/locale/zh_CN"

type IImportComp<IO, IR> = ({
	options,
	handle
}: {
	options: IOptionsWithHandle<IO>
	handle: {
		setTitle: (e: ReactNode) => void
		onOk: (e: () => IR) => void
		beforeOk: (e: () => boolean | Promise<Boolean>) => void
	}
}) => JSX.Element

type IOptionsWithHandle<T> = T & {
	_onOk: (e: unknown) => void
	_onCancel: () => void
}

export interface ModalRef<T = unknown> {
	open: (_options: T) => void
}

interface IHandle {
	title: string
	delay: number
	width?: string | number | undefined
	zIndex: number
}

const createModal = <IO, IR>(
	children: IImportComp<IO, IR>,
	control: Omit<IHandle, "delay">
) => {
	const Children = memo(children)

	const customModal = (
		_: unknown,
		ref: Ref<ModalRef<IOptionsWithHandle<IO>>> | undefined
	) => {
		const { theme, themeColor } = useAppStore.getState()
		const themeConfig = getThemeConfig(theme, themeColor)
		const [isModalOpen, setIsModalOpen] = useState(false)
		const [options, setOptions] = useState<IOptionsWithHandle<IO>>()
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

				if (!res) return
			}

			if (options) {
				options._onOk(okFunc && okFunc())
			}
			setIsModalOpen(false)
		}

		const handleCancel = () => {
			setIsModalOpen(false)
		}

		const open = (_options: IOptionsWithHandle<IO>) => {
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
					zIndex={control.zIndex}
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					<Children options={options!} handle={{ setTitle, onOk, beforeOk }} />
				</Modal>
			</ConfigProvider>
		)
	}

	return customModal
}

const defaltOptions = {
	delay: 1500,
	title: "提示",
	zIndex: 1000
} as IHandle

const ModalToApi = <IO, IR>(
	children: IImportComp<IO, IR>,
	_options?: Partial<IHandle>
) => {
	let holder: ModalRef<IOptionsWithHandle<IO>> | undefined, root: Root

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
			if (this.delay) {
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
					} as IOptionsWithHandle<IO>)
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
