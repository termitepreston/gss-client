import { Card } from "antd";
import { Outlet, Link } from "react-router-dom";

export default function Root() {
	return (
		<Card>
			<ul>
				<li>
					<Link to="/">Schedule A Task</Link>
				</li>
				<li>
					<Link to="/monitor">Monitor</Link>
				</li>
			</ul>
			<Outlet />
		</Card>
	);
}
