import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

export default function Root() {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
			<nav>
				<ul>
					<li>
						<Link to="/tasks">Task</Link>
						<Link to="/admin">Admin Board</Link>
					</li>
				</ul>
			</nav>
			<main>
				<Outlet />
			</main>
		</ConfigProvider>
	);
}
