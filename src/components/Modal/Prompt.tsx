import { Input, InputNumber, Select, Switch } from "antd"
import { useEffect, useState } from "react"
import ModalToApi from "./ModalToApi"
import { useReactive } from "ahooks"
import { isElement } from "react-dom/test-utils"
import { DefaultOptionType } from "antd/es/select"

type IResult = string | number | boolean | null

type PromptOptions = {
	title?: string // 弹框标题
	content?: string | JSX.Element // 说明文本
	type?: "text" | "textarea" | "number" | "emali" | "select" | "switch"
	value?: IResult // 默认值
	placeholder?: string
	fieldNames?: { label: string; value: string } // select用
	options?: DefaultOptionType[] // select用
	inputPattern?: RegExp // 校验正则
	inputErrorMessage?: string // 错误说明
}

/**
 * 将 T 中符合 K 的属性改为必填
 */
type CustomRequired<T, K extends keyof T> = {
	[P in K]-?: T[P]
} & Omit<T, K>

const Prompt = ModalToApi<PromptOptions, IResult | undefined>(
	({ options, handle }) => {
		const state = useReactive<
			CustomRequired<PromptOptions, "title" | "type" | "value" | "placeholder">
		>({
			title: "提示",
			type: "text",
			value: "",
			placeholder: "请输入"
		})
		const [status, setStatus] = useState<"" | "error" | "warning">("")

		const [Content, setContent] = useState<JSX.Element>()
		const [inputPattern, setInputPattern] = useState<RegExp>()

		useEffect(() => {
			if (options) {
				if (isElement(options.content)) {
					setContent(options.content as JSX.Element)
					options.content = ""
				}

				if (options.inputPattern) {
					setInputPattern(options.inputPattern)
				}
				Object.assign(state, options)
				handle.setTitle(options.title || state.title)
			}
		}, [options])

		handle.onOk((): IResult | undefined => {
			if (inputPattern) {
				const result = inputPattern.test(state.value as string)
				setStatus(result ? "" : "error")
				if (!result) return
			}

			return state.value
		})

		function changeVal(val: IResult) {
			state.value = val
		}

		const IptDom = () => {
			switch (state.type) {
				case "textarea":
					return (
						<Input.TextArea
							value={state.value as string}
							onChange={e => changeVal(e.target.value)}
							placeholder={state.placeholder}
						></Input.TextArea>
					)
				case "number":
					return (
						<InputNumber
							value={state.value as number}
							onChange={e => changeVal(e)}
							placeholder={state.placeholder}
						/>
					)
				case "select":
					return (
						<Select
							value={state.value}
							onChange={e => changeVal(e)}
							placeholder={state.placeholder}
							options={state.options}
							fieldNames={state.fieldNames}
							className="w-full"
						/>
					)
				case "switch":
					return (
						<Switch
							checkedChildren="是"
							unCheckedChildren="否"
							checked={state.value as boolean}
							onChange={e => changeVal(e)}
						/>
					)
				default:
					return (
						<Input
							status={status}
							value={state.value as string}
							onChange={e => changeVal(e.target.value)}
							placeholder={state.placeholder}
						/>
					)
			}
		}

		return (
			<>
				<div className="mb-2">{Content ? Content : state.content}</div>

				{IptDom()}

				<p className="my-1 text-red-600">
					{status === "error" ? state.inputErrorMessage : ""}
				</p>
			</>
		)
	}
)

export default Prompt
