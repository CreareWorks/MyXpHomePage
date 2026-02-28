'use client';

import React from 'react';
import styles from './Skillsheet.module.css';
import { ExplorerAppLayout } from '@/components/xp/WindowAppLayout/ExplorerAppLayout';
import { AddressBar } from '@/components/xp/AddressBar/AddressBar';
import { useMobileSidebar } from '@/hooks/useMobileSidebar';
import { ExplorerSidebar, SidebarSection, SidebarHeader, SidebarContent, SidebarLink } from '@/components/xp/ExplorerSidebar/ExplorerSidebar';
import { SidebarAppLinks } from '@/components/xp/ExplorerSidebar/SidebarAppLinks';
import { useWindows } from '@/contexts/WindowsContext';
import { DESKTOP_ICON_IDS } from '@/constants/desktopIconConstants';

export function Content() {
    const { isSidebarOpen, toggleSidebar, closeSidebar } = useMobileSidebar();
    const { openWindow } = useWindows();

    const pdfUrl = '/skillsheet.pdf';

    return (
        <ExplorerAppLayout
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
            onCloseSidebar={closeSidebar}
            containerClassName={styles.layoutContainerOverride}
            toolbar={
                <div className={styles.toolbar}>
                    <div style={{ fontSize: '11px', color: '#666', marginRight: '8px' }}>Address</div>
                    <AddressBar address="C:\My Documents\SkillSheet\Skillsheet.pdf" />
                </div>
            }
            sidebar={
                <ExplorerSidebar isOpen={isSidebarOpen}>
                    <SidebarAppLinks currentAppId={DESKTOP_ICON_IDS.SKILLSHEET} />
                    <SidebarSection>
                        <SidebarHeader title="関連リンク" />
                        <SidebarContent>
                            <SidebarLink
                                label="ポートフォリオ詳細"
                                onClick={() => {
                                    openWindow(DESKTOP_ICON_IDS.PORTFOLIO);
                                    closeSidebar();
                                }}
                            />
                            <SidebarLink
                                label="外部サイトで開く"
                                onClick={() => window.open(pdfUrl, '_blank')}
                            />
                        </SidebarContent>
                    </SidebarSection>
                </ExplorerSidebar>
            }
        >
            <div className={styles.container}>
                <div className={styles.introSection}>
                    <div className={styles.introTitle}>
                        スキル(Skill Sheet Builder 出力結果)
                    </div>
                    <p>
                        このスキルシートは、自作サービス「<strong>Skill Sheet Builder</strong>」を使用して作成したものです。<br />
                        AIとの対話を通じて、自身の経歴を客観的に分析し、事前に定義しているフォーマットで出力したものです。
                    </p>
                    <button
                        className={styles.portfolioLink}
                        onClick={() => openWindow(DESKTOP_ICON_IDS.PORTFOLIO)}
                    >
                        ツールの詳細をポートフォリオで見る
                    </button>
                </div>
                <div className={styles.pdfSection}>
                    <iframe
                        src={`${pdfUrl}#toolbar=0`}
                        className={styles.pdfViewer}
                        title="Skill Sheet PDF"
                    />
                </div>
            </div>
        </ExplorerAppLayout>
    );
}