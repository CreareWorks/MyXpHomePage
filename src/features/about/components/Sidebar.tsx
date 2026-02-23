import React from 'react';
import { DESKTOP_ICON_IDS } from '@/constants/desktopIconConstants';
import { SidebarAppLinks } from '@/components/xp/ExplorerSidebar/SidebarAppLinks';

export function Sidebar() {
    return (
        <SidebarAppLinks currentAppId={DESKTOP_ICON_IDS.ABOUT} />
    );
}
