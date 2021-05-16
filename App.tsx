import React from "react";
import NotificationsContainer from "./src/screens/NotificationsContainer";
import ValidatorHandler from "./src/screens/ValidatorHandler";
import FetchHandler from "./src/state/FetchHanlder";
import StoreProvider from "./src/state/Store";

export default function App() {
  return (
    <StoreProvider>
      <NotificationsContainer>
        <ValidatorHandler />
      </NotificationsContainer>
    </StoreProvider>
  );
}
