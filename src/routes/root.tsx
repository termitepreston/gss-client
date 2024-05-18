import React from "react";

export default function Root() {
	return (
		<React.Fragment>
			<nav>
				<ul>
					<li>
						<a href="/admin">Admin Board</a>
						<a href="/normal">Normal Board</a>
					</li>
				</ul>
			</nav>
		</React.Fragment>
	);
}
