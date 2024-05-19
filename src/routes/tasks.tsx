import type React from "react";
import {
	Button,
	Form,
	Input,
	InputNumber,
	Space,
	Flex,
	List,
	Avatar,
	Divider,
} from "antd";
import { useState } from "react";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

interface Event {
	name: string;
	description: string;
	duration: number;
}

const Tasks: React.FC = () => {
	const [form] = Form.useForm();

	const [events, setEvents] = useState<Event[]>([]);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const onFinish = async (values: any) => {
		console.log(values);

		const res = await fetch("/api/tasks", {
			method: "POST",
			body: JSON.stringify(values),
		});

		console.log(`Opening websocket connection. Status is ${res.status}`);

		const ws = new WebSocket("ws://localhost:8000/update");

		ws.onopen = () => {
			console.log("ws opened!");

			ws.send(JSON.stringify({ type: "hello", name: values.name }));
		};
		ws.onmessage = (e) => {
			const msg = JSON.parse(e.data);

			console.log("msg = ", msg);

			if (msg.type !== "hello") {
				setEvents([...events, msg]);
			}
		};
		ws.onclose = () => {
			console.log("ws closed.");
		};
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Flex>
			<Form
				{...layout}
				form={form}
				name="control-hooks"
				onFinish={onFinish}
				layout="vertical"
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
				<Form.Item>
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
			<Divider type="vertical" />
			<div>
				<List
					itemLayout="horizontal"
					dataSource={events}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								avatar={<Avatar />}
								title={item.name}
								description={item.description}
							/>
						</List.Item>
					)}
				/>
			</div>
		</Flex>
	);
};

export default Tasks;
