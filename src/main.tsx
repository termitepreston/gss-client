import React from "react";
import ReactDOM from "react-dom/client";
// import { App } from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Tasks from "./routes/tasks";
import Admin from "./routes/admin";
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
				element: <Tasks />,
			},
			{
				path: "admin",
				element: <Admin />,
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
