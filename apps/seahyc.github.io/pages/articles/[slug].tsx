import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';

import { getParsedfileContentBySlug } from '@seahyc/markdown';

interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const POSTS_PATH = join(process.cwd(), '_articles');

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = fs
  .readdirSync(POSTS_PATH)
  .map(path => path.replace(/\.mdx?$/, ''))
  .map(slug => ({ params: { slug }}));
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<ArticleProps> = async ({ 
  params
 }: {
  params: ArticleProps
}) => {

  const articleMarkdownContent = getParsedfileContentBySlug(params.slug, POSTS_PATH);
  return {
    props: {
      slug: params.slug
    }
  }
};

export function Article(props: ArticleProps) {
  return (
    <div>
      
      <h1>Welcome to {props.slug}!</h1>
      
    </div>
  );
};


export default Article;
