import { ReactNode } from 'react';
import { Flex, Loader, Text } from '@mantine/core';

export default function LoadingSuspense(props: {
    children: ReactNode,
    loading: boolean,
    loadingText?: string
}) {
    return (props.loading
        ? <>
            <Flex my="xl" gap="md" direction="column" align="center">
                <Loader color="orange" size="xl" />
                {props.loadingText
                    ? <Text>{props.loadingText}</Text>
                    : null}
            </Flex>
          </>
        : <>{props.children}</>);
}
