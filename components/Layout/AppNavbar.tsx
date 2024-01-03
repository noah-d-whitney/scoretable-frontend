'use client';

import { Code, Group, Text } from '@mantine/core';
import { IconLogout, IconSwitchHorizontal } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Routes from '@/app/navigation/routes';
import classes from './AppNavbar.module.css';
import useAuth from '@/hooks/useAuth';

export default function AppNavbar() {
    const { logout } = useAuth();
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
                <a
                  href="#"
                  className={classes.link}
                  onClick={(event) => event.preventDefault()}
                >
                    <IconSwitchHorizontal
                      className={classes.linkIcon}
                      stroke={1.5}
                    />
                    <span>Change account</span>
                </a>

                <a href="/" className={classes.link} onClick={logout}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </>
    );
}
