import { Route, Routes } from "react-router-dom";
import Root from "./routes/Root";
import Scheduler from "./routes/Scheduler";
import Monitor from "./routes/Monitor";

import { v4 as uuid4 } from "uuid";

import { useEffect, useState } from "react";

export type WSMessage =
	| { type: "hello"; name: string }
	| { type: "update"; name: string; description: string; duration: number }
	| null;

export type UpdateMsg = {
	name: string;
	description: string;
	duration: number;
};

export default function App() {
	const [webSocketReady, setWebSocketReady] = useState(false);
	const [connId, setConnId] = useState("");
	const [msgList, setMsgList] = useState<Array<UpdateMsg>>([]);
	const [webSocket, setWebSocket] = useState(
		new WebSocket("ws://localhost:8000/updates"),
	);

	useEffect(() => {
		webSocket.onopen = (_event) => {
			setWebSocketReady(true);

			const v4 = uuid4();

			webSocket.send(
				JSON.stringify({
					type: "hello",
					name: v4,
				}),
			);

			setConnId(v4);
		};

		webSocket.onmessage = (event) => {
			const decoded = JSON.parse(event.data) as WSMessage;

			if (decoded) {
				switch (decoded.type) {
					case "hello":
						break;
					case "update":
						console.log("msgList = ", msgList);

						setMsgList([
							...msgList,
							{
								name: decoded.name,
								description: decoded.description,
								duration: decoded.duration,
							},
						]);

						break;
				}
			}
		};

		webSocket.onclose = (_event) => {
			setWebSocketReady(false);
			setTimeout(() => {
				setWebSocket(new WebSocket("ws://localhost:8000/updates"));
			}, 1000);
		};

		webSocket.onerror = (err) => {
			console.log("Socket encountered error: ", err, "Closing socket");
			setWebSocketReady(false);
			webSocket.close();
		};

		// return () => {
		// 	webSocket.close();
		// };
	}, [webSocket, msgList]);

	return (
		<Routes>
			<Route path="/" element={<Root />}>
				<Route
					index
					element={
						<Scheduler wsId={connId} wsMsg={msgList} wsReady={webSocketReady} />
					}
				/>
				<Route path="monitor" element={<Monitor />} />
			</Route>
		</Routes>
	);
}
