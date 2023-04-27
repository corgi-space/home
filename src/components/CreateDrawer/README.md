# 以 API 的方式创建弹框

## 目的

封装`Drawer`组件，省略维护弹框相关的代码，直接编写业务代码

## 用法

```tsx
// 创建

/**
 * 弹出时传入的options
 *
 * 通过open传入
 */
type IMyDrawerOptions = {
	name: string
	age: number
}

/**
 * 创建组件时携带的props
 *
 * 通过标签传入
 */
type IMyDrawerProps = {
	id: number
	update: () => void
}

type MyDrawerRef = DrawerRef<IMyDrawerOptions>
const MyDrawer = createDrawer<IMyDrawerProps, IMyDrawerOptions>(
	({ props, options, handle }) => {
		const [form] = Form.useForm()

		useEffect(() => {
			form.setFieldsValue(options)
		}, [options])

		const name = useWatch("name", form)

		const onFinish = values => {
			console.log(props, values)
			props.update()
			// 手动关闭抽屉
			handle.close()
		}

		useEffect(() => {
			if (name) {
				// 手动设置title
				handle.setTitle(name)
			}
		}, [name])

		return (
			<Form form={form} onFinish={onFinish}>
				<Form.Item label="姓名" name="name">
					<Input></Input>
				</Form.Item>
				<Form.Item label="年龄" name="age">
					<Input></Input>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						保存
					</Button>
				</Form.Item>
			</Form>
		)
	}
)
```

```tsx
// 使用
function Demo2() {
	const drawerRef = useRef<MyDrawerRef>(null)

	const openDrawer = () => {
		drawerRef.current!.open({
			name: "哈哈哈",
			age: 6
		})
	}

	const update = () => {
		console.log("更新")
	}

	return (
		<div>
			<Button onClick={openDrawer}>开启</Button>

			<MyDrawer id={3} update={update} ref={drawerRef} />
		</div>
	)
}
```
