import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Root() {
	return (
		<React.Fragment>
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
		</React.Fragment>
	);
}
