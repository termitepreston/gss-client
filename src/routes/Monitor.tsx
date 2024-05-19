import type React from "react";
import { Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";

const { Column, ColumnGroup } = Table;

interface DataType {
	key: React.Key;
	name: string;
	description: string;
	status: string;
	duration: number;
}

interface Task {
	name: string;
	description: string;
	duration: number;
}

const Monitor: React.FC = () => {
	const [tasks, setTasks] = useState<DataType[]>([]);

	useEffect(() => {
		async function fetchTasks() {
			const res = await fetch("/api/admin");

			const data: {
				processing: Task;
				pending: Task[];
			} = await res.json();

			let table: DataType[] = [];

			if (data?.processing && !Array.isArray(data.processing))
				table = [
					...table,
					{ ...data.processing, status: "Processing", key: 0 },
				];

			table = [
				...table,
				...data.pending.map((val, idx) => {
					return { ...val, key: idx + 1, status: "Pending" };
				}),
			];

			console.log("table = ", table);

			setTasks([...table]);
		}

		fetchTasks();
	}, []);

	return (
		<Table dataSource={tasks}>
			<ColumnGroup title="Name">
				<Column title="Assigner" dataIndex="name" key="name" />
			</ColumnGroup>
			<Column title="Description" dataIndex="description" key="description" />
			<Column title="Duration" dataIndex="duration" key="duration" />
			<Column
				title="Status"
				dataIndex="status"
				key="status"
				render={(status: string) => (
					<Tag color={status === "Pending" ? "red" : "green"}>
						{status.toUpperCase()}
					</Tag>
				)}
			/>
		</Table>
	);
};

export default Monitor;
