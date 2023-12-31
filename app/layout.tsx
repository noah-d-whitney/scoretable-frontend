import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';

export const metadata = {
    title: 'Mantine Next.js template',
    description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
                <link
                  rel="stylesheet"
                  href="https://use.typekit.net/jfa2tel.css"
                />
                <link
                  rel="stylesheet"
                  href="https://use.typekit.net/jfa2tel.css"
                />
                <meta
                  name="viewport"
                  content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <MantineProvider theme={theme}>
                    <Notifications
                      position="bottom-right"
                      zIndex={100}
                    />
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
