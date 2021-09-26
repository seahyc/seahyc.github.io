import fs from 'fs';
import matter from 'gray-matter';
import { join } from "path"
import { MarkdownDocument } from './types';

export const getParsedfileContentBySlug = (
    slug: string,
    postsPath: string
): MarkdownDocument => {
    const postFilePath = join(postsPath, `${slug}.mdx`);
    const fileContents = fs.readFileSync(postFilePath);

    const { data, content } = matter(fileContents);

    return {
        frontMatter: data,
        content,
    };
};