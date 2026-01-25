import React from 'react';
import Image from 'next/image';
import { DESKTOP_APP_CONFIGS, ON_DESKTOP_ICON_IDS } from '@/config/desktopApps';
import { DESKTOP_ICON_IDS } from '@/constants/desktopIconConstants';
import {
    SidebarSection,
    SidebarHeader,
    SidebarContent,
    SidebarLink
} from '@/components/xp/ExplorerSidebar/ExplorerSidebar';

interface SidebarProps {
    onNavigate: (id: string) => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
    const menuApps = DESKTOP_APP_CONFIGS.filter(app =>
        ON_DESKTOP_ICON_IDS.includes(app.id) && app.id !== DESKTOP_ICON_IDS.ABOUT
    );

    return (
        <SidebarSection>
            <SidebarHeader title="コンテンツ" />
            <SidebarContent>
                {menuApps.map(app => (
                    <SidebarLink
                        key={app.id}
                        label={app.title}
                        onClick={() => onNavigate(app.id)}
                        icon={
                            <Image
                                src={app.icon}
                                alt=""
                                width={16}
                                height={16}
                            />
                        }
                    />
                ))}
            </SidebarContent>
        </SidebarSection>
    );
}
