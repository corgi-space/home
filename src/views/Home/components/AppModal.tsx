import { ThemeColor } from "@/config"
import useAppStore from "@/store/appStore"
import { getThemeConfig } from "@/styles/theme"
import { ConfigProvider, Modal } from "antd"
import { useState, useImperativeHandle, memo, forwardRef, Ref, FC } from "react"
import { Root, createRoot } from "react-dom/client"

interface IAppModalOptions {
	link?: string
	author?: string
	width?: string
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
				>
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

	const Comp = forwardRef(AppModal(Children, options))

	return () => {
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
						// Promise.resolve().then(() => {
						if (!holder && node) {
							holder = node
							openRun()
						}
						// })
					}}
				/>
			)
		} else {
			openRun()
		}
	}
}
