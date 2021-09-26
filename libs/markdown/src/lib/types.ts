export interface FrontMatter {
  [prop: string]: string;
}

export interface MarkdownDocument {
  frontMatter: FrontMatter;
  content: string;
}

export interface MarkdownRenderingResult {
  frontmatter: FrontMatter;
  html: string;
}
