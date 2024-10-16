"use client";
import "./global.scss";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700", "600", "900"],
  subsets: ["latin"],
});
import { store, persistor } from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "../components/navbar/navbar";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div>
              <Navbar />
            </div>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
