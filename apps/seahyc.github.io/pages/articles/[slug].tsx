import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  return {
    paths: [1, 2, 3].map(idx => ({
      params: {
        slug: `page${idx}`,
      }
    })),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<ArticleProps> = async ({ 
  params
 }: {
  params: ArticleProps
}) => {
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
