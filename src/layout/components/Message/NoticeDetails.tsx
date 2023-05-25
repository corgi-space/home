import { CreateMessage } from "@/api/system"
import { ICreateNotice } from "@/api/system/types"
import createDrawer, { DrawerRef } from "@/components/CreateDrawer/index"
import { useMutationObserver } from "ahooks"
import { Button, Checkbox, Divider, Form, Input, message } from "antd"
import { useEffect } from "react"

export interface IDrawerOptions {
	type: "create" | "edit" | "view"
	id?: number
}

export type ISettingDrawerRef = DrawerRef<IDrawerOptions>
const NoticeDetails = createDrawer<{}, IDrawerOptions>(
	({ options, handle }) => {
		const plainOptions = [
			{ label: "超管", value: 1 },
			{ label: "管理员", value: 2 },
			{ label: "运营", value: 3 },
			{ label: "销售", value: 4 }
		]

		useEffect(() => {
			if (options) {
				switch (options.type) {
					case "create":
						handle.setTitle("创建通知")
						break
					case "edit":
						handle.setTitle("修改通知")
						break
					default:
						handle.setTitle("查看通知")
						break
				}
			}
		}, [options])

		const onFinish = async (values: ICreateNotice) => {
			await CreateMessage(values)

			message.success("提交成功")
			handle.close()
		}

		useMutationObserver(
			mutationsList => {
				console.log(mutationsList)
			},
			document.getElementById("#textareaFormItem"),
			{ attributes: true }
		)

		return (
			<Form
				onFinish={onFinish}
				className="flex h-full flex-col justify-between"
			>
				<Form.Item
					name="title"
					rules={[{ required: true, message: "请输入标题!" }]}
					className="mb-0"
				>
					<Input placeholder="请输入标题" bordered={false} size="large"></Input>
				</Form.Item>
				<Divider className="mb-6 mt-2"></Divider>
				<Form.Item
					name="content"
					rules={[{ required: true, message: "请输入内容!" }]}
					noStyle
				>
					<Input.TextArea
						showCount
						className="mb-4 flex-1"
						size="large"
						placeholder="请输入内容"
					></Input.TextArea>
				</Form.Item>
				<Form.Item
					label="目标群体"
					name="target"
					rules={[{ required: true, message: "请选择目标群体!" }]}
				>
					<Checkbox.Group options={plainOptions} />
				</Form.Item>
				<Form.Item className="text-center">
					<Button type="primary" htmlType="submit" size="large">
						提交
					</Button>
				</Form.Item>
			</Form>
		)
	},
	{
		width: "600px"
	}
)

export default NoticeDetails
