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
	Typography,
} from "antd";
import type { UpdateMsg } from "../App";

const { Link, Paragraph } = Typography;

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

interface SchedulerProps {
	wsId: string;
	wsReady: boolean;
	wsMsg: UpdateMsg[];
}

const Scheduler: React.FC<SchedulerProps> = ({
	wsId,
	wsMsg,
	wsReady,
}: SchedulerProps) => {
	const [form] = Form.useForm();

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const onFinish = async (values: any) => {
		console.log(values);

		const res = await fetch("/api/tasks", {
			method: "POST",
			body: JSON.stringify({ ...values, name: wsId }),
		});

		console.log(res.status);

		form.resetFields();
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Flex vertical>
			<Flex vertical>
				<Paragraph>
					{wsReady
						? "Websocket connection established."
						: "Waiting for WS connection"}
				</Paragraph>
				<Paragraph>Unique connection identifier: {wsId}</Paragraph>
			</Flex>
			<Flex>
				<Form
					{...layout}
					form={form}
					name="control-hooks"
					onFinish={onFinish}
					layout="vertical"
					style={{ maxWidth: 600, flexGrow: 1 }}
				>
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
				<List
					itemLayout="horizontal"
					dataSource={wsMsg}
					style={{ flexGrow: 1 }}
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
			</Flex>
		</Flex>
	);
};

export default Scheduler;
