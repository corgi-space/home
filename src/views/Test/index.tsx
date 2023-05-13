import React, { useEffect, useRef, useState } from "react"
import styles from "./index.module.scss"
import { Menu } from "antd"
import { Header } from "antd/es/layout/layout"
import Tools from "@/layout/components/Tools"
import {
	HomeOutlined,
	CloudServerOutlined,
	MacCommandOutlined,
	PayCircleOutlined
} from "@ant-design/icons"

const HeaderItems = [
	{ icon: <HomeOutlined size={48} />, key: "home", label: "首页" },
	{ icon: <CloudServerOutlined size={48} />, key: "devOps", label: "运维" },
	{ icon: <MacCommandOutlined size={48} />, key: "operate", label: "运营" },
	{ icon: <PayCircleOutlined size={48} />, key: "sale", label: "销售" }
]

const HexagonalMesh1 = () => {
	const [list, setList] = useState<number[]>()

	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (containerRef.current) {
			const { width } = containerRef.current.getBoundingClientRect()
			setList(new Array(Math.round(width / 25) * 3).fill(0))
		}
	}, [containerRef])

	const onMouseMove = (e: React.MouseEvent) => {
		if (containerRef.current) {
			const { left, top } = containerRef.current.getBoundingClientRect()
			const x = e.pageX - left
			const y = e.pageY - top
			window.requestAnimationFrame(function () {
				if (containerRef.current) {
					containerRef.current.style.setProperty("--xPos", `${x}px`)
					containerRef.current.style.setProperty("--yPos", `${y}px`)
				}
			})
		}
	}

	const onMouseLeave = () => {
		if (containerRef.current) {
			// const { width, height } = containerRef.current.getBoundingClientRect()
			// const x = width / 2
			// const y = height / 2
			containerRef.current.style.setProperty("--xPos", `${999}px`)
			containerRef.current.style.setProperty("--yPos", `${999}px`)
		}
	}

	useEffect(() => {
		onMouseLeave()
	}, [])

	return (
		<div className={styles.app}>
			<div className="relative">
				<div
					className={styles.container}
					onMouseMove={onMouseMove}
					onMouseLeave={onMouseLeave}
					ref={containerRef}
				>
					{list &&
						list.map((item: number, index: number) => (
							<div key={index} className={styles.item} />
						))}
				</div>
				<Header className="pointer-events-none absolute left-0 top-0 flex w-full justify-between bg-transparent px-4">
					<div className="flex">
						<div className="pointer-events-auto h-full px-2 py-3">
							<img src="/logo.png" className="h-full" />
						</div>
						<Menu
							mode="horizontal"
							defaultSelectedKeys={["home"]}
							items={HeaderItems}
							className="pointer-events-auto bg-transparent px-5"
						/>
					</div>
					<Tools className="pointer-events-auto" />
				</Header>
			</div>
		</div>
	)
}

export default HexagonalMesh1
