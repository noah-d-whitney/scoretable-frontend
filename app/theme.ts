'use client';

import {Alert, createTheme} from '@mantine/core';

export const theme = createTheme({
  fontFamilyMonospace: 'mono45-headline, Courier, monospace',
  fontFamily: 'obvia, sans-serif',
    components: {
      Alert: Alert.extend({
          styles: {
              message: { marginTop: 0 },
          },
      }),
    },
});
