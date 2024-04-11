import { notifications } from '@mantine/notifications';
import { ReactElement } from 'react';

export default function useNotify() {
    function notify(id: string, title: string, message: string, icon?: ReactElement, loading?: boolean) {
        notifications.show({
            id,
            title,
            message,
            color: 'orange',
            withBorder: true,
            radius: 'md',
            icon,
            autoClose: 4000,
            loading,
        });
    }

    return {
        notify,
    };
}
