'use client';

/* MANTINE IMPORTS */
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

/* COMPONENT IMPORTS */
import AppHeader from '@/components/Layout/AppHeader';
import AppNavbar from '@/components/Layout/AppNavbar';

export default function DashboardLayout({ children }: { children: any }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'md', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header
        px={20}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <AppHeader opened={opened} toggle={() => toggle()} />
      </AppShell.Header>

      <AppShell.Navbar p="md" bg="orange">
        <AppNavbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
