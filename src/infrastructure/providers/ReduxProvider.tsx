import { Provider } from "react-redux";
import store from "../redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

persistStore(store);

export default function ReduxProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Provider store={store}>
		{children}
	</Provider >;
}