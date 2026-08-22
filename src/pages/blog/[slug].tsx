import React from 'react';
import Link from 'next/link';
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';
import { Layout } from '@/components';
import { ALL_BLOG_POSTS_MESSAGE, BLOG } from '@/utils/constants';
import { getBlogPostBySlug, listPostSlugs } from '@/lib/content';

const StyledPostContainer = styled.main`
  max-width: 1000px;
`;
const StyledPostHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
  }
`;
const StyledPostContent = styled.div`
  margin-bottom: 100px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2rem 0 0.5rem;
  }

  p {
    margin: 1em 0;
    line-height: 1.5;
    color: var(--light-slate);
  }

  a {
    ${({ theme }) => `${theme.mixins.inlineLink}`}
  }

  code {
    background-color: var(--text-highlight);
    color: var(--lighter-slate);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }
`;

const BlogPostPage = ({ post }) => {
  if (!post) {
    return null;
  }

  const { frontmatter, html } = post;
  const { title, date, tags = [] } = frontmatter;

  return (
    <Layout headProps={{ title }}>
      <StyledPostContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link href="/blog">{ALL_BLOG_POSTS_MESSAGE}</Link>
        </span>

        <StyledPostHeader>
          <h1 className="medium-heading">{title}</h1>
          <p className="subtitle">
            <time>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>&nbsp;&mdash;&nbsp;</span>
            {tags.map((tag, i) => (
              <Link key={i} href={`/${BLOG}/tags/${kebabCase(tag)}/`} className="tag">
                #{tag}
              </Link>
            ))}
          </p>
        </StyledPostHeader>

        <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />
      </StyledPostContainer>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = listPostSlugs().map(slug => {
    const normalized = slug
      .replace(/^\/blog\//, '')
      .replace(/^\//, '')
      .replace(/\/$/, '');
    return { params: { slug: normalized } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = `/blog/${params.slug}/`;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
}

export default BlogPostPage;
