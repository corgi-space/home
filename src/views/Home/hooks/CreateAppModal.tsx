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
	_close?: () => void
}

interface ModalHandleRef {
	open: () => void
}

const AppModal = (Children: FC, options: IAppModalOptions) => {
	const customModal = (_: unknown, ref: Ref<ModalHandleRef>) => {
		const { theme } = useAppStore.getState()
		const themeConfig = getThemeConfig(theme, ThemeColor)
		const [isModalOpen, setIsModalOpen] = useState(false)

		const open = () => {
			setIsModalOpen(true)
		}

		const close = () => {
			options._close && options._close()
			setIsModalOpen(false)
		}

		useImperativeHandle(ref, () => ({
			open
		}))

		return (
			<ConfigProvider theme={themeConfig}>
				<Modal
					maskClosable={false}
					width={options.width}
					open={isModalOpen}
					footer={false}
					bodyStyle={{ position: "relative" }}
					closeIcon={false}
					destroyOnClose
					style={{ padding: "0px" }}
					className="appModal"
				>
					<div className="tools">
						<div></div>
						<div className="flex items-center">
							<div className="tools-item">
								<FullscreenOutlined />
							</div>
							<div className="tools-item" onClick={close}>
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
	options: IAppModalOptions
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
	 * 在弹框关闭的一定时间后，卸载所有组件
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
