import React from "react";
import ReactDOM from "react-dom/client";
// import { App } from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./error-page";
import Scheduler from "./routes/Scheduler";
import Monitor from "./routes/Monitor";
import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				path: "tasks",
				element: <Scheduler />,
			},
			{
				path: "admin",
				element: <Monitor />,
			},
		],
	},
]);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
