'use client';

import React from 'react';
import Image from 'next/image';
import styles from './PortfolioApp.module.css';
import { ProjectMetadata } from '../types';

interface PortfolioListProps {
    projects: ProjectMetadata[];
    onSelect: (id: string) => void;
}

export function PortfolioList({ projects, onSelect }: PortfolioListProps) {
    return (
        <div className={styles.grid}>
            {projects.map((project) => (
                <div
                    key={project.id}
                    className={styles.card}
                    onClick={() => onSelect(project.id)}
                >
                    <div className={styles.thumbnailWrapper}>
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            className={styles.thumbnail}
                            width={400}
                            height={250}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.cardInfo}>
                        <div className={styles.cardTitle}>{project.title}</div>
                        <div className={styles.cardDesc}>{project.description}</div>
                        <div className={styles.techList}>
                            {project.techStack.map(tech => (
                                <span key={tech} className={styles.techTag}>{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
