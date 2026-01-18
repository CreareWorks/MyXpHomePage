export type PostMetadata = {
    title: string;
    date: string;
    category: string;
    tags: string[];
    description: string;
    slug: string;
};

export type BlogPost = {
    metadata: PostMetadata;
    content: string;
};