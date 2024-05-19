import { Outlet, Link } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

export default function Root() {
	return (
		<ConfigProvider>
			<nav>
				<ul>
					<li>
						<Link to="/tasks">Schedule A Task</Link>
					</li>
					<li>
						<Link to="/admin">View All Tasks</Link>
					</li>
				</ul>
			</nav>
			<main>
				<Outlet />
			</main>
		</ConfigProvider>
	);
}
