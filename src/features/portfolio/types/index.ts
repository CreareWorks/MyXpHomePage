import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

export interface ProjectMetadata {
    id: string;
    title: string;
    date: string;
    category: string;
    description: string;
    thumbnail: StaticImageData | string;
    url?: string;
    githubUrl?: string;
    techStack: string[];
    status?: 'active' | 'suspended';
}

export interface Project {
    metadata: ProjectMetadata;
    content: ReactNode;
}
