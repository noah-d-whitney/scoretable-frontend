'use client';

import { Group, Code, Text } from '@mantine/core';
import { IconSwitchHorizontal, IconLogout } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import Routes from '@/app/navigation/routes';
import classes from './AppNavbar.module.css';

export default function AppNavbar() {
    const router = useRouter();
    const api = axios.create({
        baseURL: 'https://localhost:7272',
    });
    async function onClick(event: any) {
        event.preventDefault();
        try {
            await api.post('/Logout', {});
            router.push('/');
        } catch (e) {
            console.log(e);
        }
    }
  const activePath = usePathname();

  const links = Routes.map((route) => (
    <Link
      className={classes.link}
      data-active={route.path === activePath || undefined}
      href={route.path}
      key={route.label}
    >
      <route.icon className={classes.linkIcon} stroke={1.5} />
      <span>{route.label}</span>
    </Link>
  ));

  return (
    <>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Text fw={700} c="gray.1">
            ScoreTable
          </Text>
          <Code fw={700} className={classes.version}>
            v3.1.2
          </Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="/" className={classes.link} onClick={onClick}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </>
  );
}
