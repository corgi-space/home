import { ThemeColor } from "@/config"
import useAppStore from "@/store/appStore"
import { getThemeConfig } from "@/styles/theme"
import { CloseOutlined, FullscreenOutlined } from "@ant-design/icons"
import { ConfigProvider, Modal } from "antd"
import { useState, useImperativeHandle, memo, forwardRef, Ref, FC } from "react"
import { Root, createRoot } from "react-dom/client"

interface IAppModalOptions {
	link?: string
	author?: string
	width?: string
	toolTheme?: "light" | "dark"
	hasFull?: boolean

	_close?: () => void
}

interface ModalHandleRef {
	open: () => void
}

const defaultOptions = {
	width: "800px",
	toolTheme: "dark",
	hasFull: true
} as IAppModalOptions

const AppModal = (Children: FC, options: IAppModalOptions) => {
	const customModal = (_: unknown, ref: Ref<ModalHandleRef>) => {
		const _options = Object.assign({}, defaultOptions, options)
		const { theme } = useAppStore.getState()
		const themeConfig = getThemeConfig(theme, ThemeColor)
		const [isModalOpen, setIsModalOpen] = useState(false)
		const [fullStatus, setFullStatus] = useState(false)

		const open = () => {
			setIsModalOpen(true)
		}

		const close = () => {
			_options._close && _options._close()
			setIsModalOpen(false)
		}

		const handleFull = () => {
			setFullStatus(!fullStatus)
		}

		useImperativeHandle(ref, () => ({
			open
		}))

		return (
			<ConfigProvider theme={themeConfig}>
				<Modal
					maskClosable={false}
					width={_options.width}
					open={isModalOpen}
					footer={false}
					bodyStyle={{ position: "relative" }}
					closeIcon={false}
					destroyOnClose
					style={{ padding: "0px" }}
					className={(fullStatus ? "appMpdal-full" : "") + " appModal"}
				>
					<div
						className={`tools ${
							_options.toolTheme ? `tools-` + _options.toolTheme : ""
						}`}
					>
						<div></div>
						<div className="flex items-center">
							{_options.hasFull ? (
								<div className="tools-item" onClick={handleFull}>
									<FullscreenOutlined />
								</div>
							) : null}

							<div
								className="tools-item hover:!bg-red-500"
								data-key="close"
								onClick={close}
							>
								<CloseOutlined />
							</div>
						</div>
					</div>
					<Children />
				</Modal>
			</ConfigProvider>
		)
	}

	return customModal
}

export const createAppModal = (
	children: () => JSX.Element,
	options: IAppModalOptions = {}
) => {
	let holder: ModalHandleRef | undefined, root: Root
	const Children = memo(children)

	function unmount() {
		root && root.unmount()
		if (holder) {
			holder = undefined
		}
	}

	options["_close"] = () => {
		unmontTask.start()
	}

	/**
	 * 卸载任务
	 *
	 * 在弹框关闭的一定时间后，卸载组件
	 */
	const unmontTask: {
		timer: NodeJS.Timeout | null
		pause: () => void
		start: () => void
	} = {
		timer: null,
		pause() {
			if (this.timer) {
				clearTimeout(this.timer)
				this.timer = null
			}
		},
		start() {
			this.timer = setTimeout(unmount, 1000)
		}
	}

	const Comp = forwardRef(AppModal(Children, options))

	return () => {
		unmontTask.pause()

		const openRun = () => {
			if (holder) {
				holder.open()
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
						if (!holder && node) {
							holder = node
							openRun()
						}
					}}
				/>
			)
		} else {
			openRun()
		}
	}
}

export const useOpenApp = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	load: () => Promise<any>,
	key: string = "default"
) => {
	return async () => {
		const app = await load()
		app[key] && app[key]()
	}
}
