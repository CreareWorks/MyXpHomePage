import React from 'react';
import Image from 'next/image';
import { DESKTOP_APP_CONFIGS, ON_DESKTOP_ICON_IDS } from '@/config/desktopApps';
import { useWindows } from '@/contexts/WindowsContext';
import { useMobileSidebar } from '@/hooks/useMobileSidebar';
import { DesktopIconId } from '@/constants/desktopIconConstants';
import {
    SidebarSection,
    SidebarHeader,
    SidebarContent,
    SidebarLink
} from './ExplorerSidebar';

interface SidebarAppLinksProps {
    currentAppId?: DesktopIconId;
}

export function SidebarAppLinks({ currentAppId }: SidebarAppLinksProps) {
    const { openWindow } = useWindows();
    const { closeSidebar } = useMobileSidebar();

    const menuApps = DESKTOP_APP_CONFIGS.filter(app =>
        ON_DESKTOP_ICON_IDS.includes(app.id) && app.id !== currentAppId
    );

    const handleNavigate = (id: DesktopIconId) => {
        openWindow(id);
        closeSidebar();
    };

    return (
        <SidebarSection>
            <SidebarHeader title="コンテンツ" />
            <SidebarContent>
                {menuApps.map(app => (
                    <SidebarLink
                        key={app.id}
                        label={app.title}
                        onClick={() => handleNavigate(app.id)}
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
