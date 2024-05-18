import type React from "react";
import { Button, Form, Input, InputNumber, Space } from "antd";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const Tasks: React.FC = () => {
	const [form] = Form.useForm();

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const onFinish = async (values: any) => {
		console.log(values);

		const endpoint = new URL("http://localhost:8000/api/tasks");

		const res = await fetch(endpoint, {
			method: "POST",
			body: JSON.stringify(values),
		});

		console.log(`Status = ${res.status}`);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Form
			{...layout}
			form={form}
			name="control-hooks"
			onFinish={onFinish}
			style={{ maxWidth: 600 }}
		>
			<Form.Item name="name" label="Unique Name" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item
				name="description"
				label="Task Description"
				rules={[{ required: true }]}
			>
				<Input.TextArea rows={4} />
			</Form.Item>

			<Form.Item
				name="duration"
				label="Duration (mins)"
				rules={[{ required: true }]}
			>
				<InputNumber min={1} max={3600} />
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Space>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
					<Button htmlType="button" onClick={onReset}>
						Reset
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

export default Tasks;
