'use client';

import React from 'react';
import styles from './PortfolioApp.module.css';
import { ProjectMetadata } from '../types';
import { StaticImageData } from 'next/image';

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
                        <img
                            src={typeof project.thumbnail === 'string' ? project.thumbnail : (project.thumbnail as StaticImageData).src}
                            alt={project.title}
                            className={styles.thumbnail}
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
