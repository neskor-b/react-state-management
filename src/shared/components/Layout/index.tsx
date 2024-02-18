import React, { ReactNode } from 'react';

// UI
import { Box, Flex } from "@chakra-ui/react"

// components
import  { TSettings } from 'shared/components/Settings';

// hooks
import useLocalStorage, { CUSTOM_EVENTS } from "shared/hooks/useLocalStorage";

interface TodoLayoutProps {
    children: ReactNode;
}


const App: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Box 
            pb={3} 
            flexGrow={1}
            maxWidth="600px"
            width="100%"
        >
            {children}
        </Box>
    );
}

const Widget: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Box 
            pb={3} 
            flexGrow={1}
            width="100%"
        >
            {children}
        </Box>
    );
}

const Layout: React.FC<TodoLayoutProps> = ({ children }) => {
    const { pageValue: settings } = useLocalStorage<TSettings>({
        key: CUSTOM_EVENTS.UPDATE_SETTINGS
    });

    let app, widget;

    React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            switch (child.type) {
                case App:
                    app = child;
                    break;
                case Widget:
                    widget = child;
                    break;
                default:
                    break;
            }
        }
    });
    return (
        <Box 
            height="100%" 
            position="relative" 
            pt={2}
        >
            <Flex 
                height="100%"
                justifyContent="center"
                gap={settings?.isWidgetOpen ? 3 : 0}
                transition="all 0.5s ease-in-out"
            >
                {app}
                <Box
                    overflow="hidden"
                    opacity={settings?.isWidgetOpen ? 1 : 0}
                    transition="all 0.5s ease-in-out"
                    width={settings?.isWidgetOpen ? "100%" : "0px"}
                >
                    {widget}
                </Box>
            </Flex>
        </Box>
    );
}

export default Object.assign(Layout, {
    App,
    Widget
});
