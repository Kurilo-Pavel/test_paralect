import type {Metadata} from "next";
import "@globals.css";
import "@mantine/core/styles.css";
import React from "react";
import {ColorSchemeScript, MantineProvider} from "@mantine/core";
import App from "@/app/App";
import {StoreProvider} from "@/app/store/Storeprovider";

export const metadata: Metadata = {
  title: "Kurilo Pavel",
  description: "Test Paralect",
};


const RootLayout = ({children}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <StoreProvider>
      <html lang="en">
      <head>
        <ColorSchemeScript/>
      </head>
      <body>
      <MantineProvider>
        <App>
          {children}
        </App>
      </MantineProvider>
      </body>
      </html>
    </StoreProvider>
  );
};
export default RootLayout;
