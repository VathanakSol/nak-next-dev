declare module 'react-notification-component' {
    export const store: {
        addNotification: (notification: {
            title: string;
            message: string;
            type: string;
            insert: string;
            container: string;
            dismiss: {
                duration: number;
                onScreen: boolean;
            };
        }) => void;
    };
}