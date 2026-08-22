import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

type MarkdownRecord<T = Record<string, any>> = {
  filePath: string;
  frontmatter: T;
  content: string;
};

type BlogPostFrontmatter = {
  title: string;
  description: string;
  date: string;
  draft?: boolean;
  slug: string;
  tags?: string[];
  edgy?: boolean;
};

type ProjectFrontmatter = {
  date: string;
  title: string;
  github?: string;
  external?: string;
  tech?: string[];
  showInProjects?: boolean;
  ios?: string;
  android?: string;
  company?: string;
};

type JobFrontmatter = {
  title: string;
  company: string;
  location: string;
  range: string;
  url: string;
  date: string;
};

type FeaturedFrontmatter = {
  date: string;
  title: string;
  cover: string;
  tech: string[];
  github?: string;
  external?: string;
  cta?: string;
};

function sanitizeFrontmatter<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function walkMarkdownFiles(dirPath: string): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
      continue;
    }

    if (entry.isFile() && fullPath.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function readMarkdownDir<T>(dirName: string): MarkdownRecord<T>[] {
  const dirPath = path.join(CONTENT_ROOT, dirName);
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return walkMarkdownFiles(dirPath).map(filePath => {
    const file = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(file);

    return {
      filePath,
      frontmatter: sanitizeFrontmatter(data) as T,
      content,
    };
  });
}

function sortByDateDesc<T extends { frontmatter: { date?: string } }>(items: T[]): T[] {
  return items.sort((a, b) => {
    const left = new Date(a.frontmatter.date ?? 0).getTime();
    const right = new Date(b.frontmatter.date ?? 0).getTime();
    return right - left;
  });
}

function resolveContentAssetPath(filePath: string, assetPath: string): string {
  if (!assetPath || assetPath.startsWith('http') || assetPath.startsWith('/')) {
    return assetPath;
  }

  const resolved = path.resolve(path.dirname(filePath), assetPath);
  const relativeToContent = path.relative(CONTENT_ROOT, resolved).split(path.sep).join('/');
  return `/${relativeToContent.startsWith('content/') ? relativeToContent : `content/${relativeToContent}`}`;
}

function rewriteMarkdownImagePaths(filePath: string, html: string): string {
  return html.replace(/(<img[^>]*?src=")([^"]+)("[^>]*>)/g, (_match, prefix, src, suffix) => {
    const rewritten = resolveContentAssetPath(filePath, src);
    return `${prefix}${rewritten}${suffix}`;
  });
}

async function markdownToHtml(filePath: string, markdown: string): Promise<string> {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);
  return rewriteMarkdownImagePaths(filePath, processed.toString());
}

export async function getBlogPosts() {
  const posts = readMarkdownDir<BlogPostFrontmatter>('posts')
    .filter(post => post.frontmatter?.slug)
    .filter(post => post.frontmatter?.draft !== true);

  const mapped = await Promise.all(
    posts.map(async post => ({
      ...post,
      html: await markdownToHtml(post.filePath, post.content),
    })),
  );

  return sortByDateDesc(mapped);
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find(post => post.frontmatter.slug === slug) ?? null;
}

export async function getBlogPostsByTag(tag: string) {
  const posts = await getBlogPosts();
  return posts.filter(post => (post.frontmatter.tags ?? []).includes(tag));
}

export async function getTagGroups() {
  const posts = await getBlogPosts();
  const tally = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.frontmatter.tags ?? []) {
      tally.set(tag, (tally.get(tag) ?? 0) + 1);
    }
  }

  return [...tally.entries()]
    .map(([fieldValue, totalCount]) => ({ fieldValue, totalCount }))
    .sort((a, b) => a.fieldValue.localeCompare(b.fieldValue));
}

export async function getProjects() {
  const projects = readMarkdownDir<ProjectFrontmatter>('projects');
  const mapped = await Promise.all(
    projects.map(async project => ({
      ...project,
      html: await markdownToHtml(project.filePath, project.content),
    })),
  );

  return sortByDateDesc(mapped);
}

export async function getFeaturedProjects() {
  const featured = readMarkdownDir<FeaturedFrontmatter>('featured');
  const mapped = await Promise.all(
    featured.map(async project => ({
      ...project,
      frontmatter: {
        ...project.frontmatter,
        cover: resolveContentAssetPath(project.filePath, project.frontmatter.cover),
      },
      html: await markdownToHtml(project.filePath, project.content),
    })),
  );

  return mapped.sort((a, b) => `${a.frontmatter.date}`.localeCompare(`${b.frontmatter.date}`));
}

export async function getJobs() {
  const jobs = readMarkdownDir<JobFrontmatter>('jobs');
  const mapped = await Promise.all(
    jobs.map(async job => ({
      ...job,
      html: await markdownToHtml(job.filePath, job.content),
    })),
  );

  return sortByDateDesc(mapped);
}

export async function getEducation() {
  const education = readMarkdownDir<JobFrontmatter>('education');
  const mapped = await Promise.all(
    education.map(async item => ({
      ...item,
      html: await markdownToHtml(item.filePath, item.content),
    })),
  );

  return sortByDateDesc(mapped);
}

export function listPostSlugs() {
  return readMarkdownDir<BlogPostFrontmatter>('posts')
    .filter(post => post.frontmatter?.slug)
    .filter(post => post.frontmatter?.draft !== true)
    .map(post => post.frontmatter.slug);
}
