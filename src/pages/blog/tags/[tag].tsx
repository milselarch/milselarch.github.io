import React from 'react';
import Link from 'next/link';
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';
import { Layout } from '@/components';
import { ALL_BLOG_POSTS_MESSAGE, BLOG } from '@/utils/constants';
import { getBlogPostsByTag, getTagGroups } from '@/lib/content';

const StyledTagsContainer = styled.main`
  max-width: 1000px;

  h1 {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 50px;

    a {
      font-size: var(--fz-lg);
      font-weight: 400;
    }
  }

  ul {
    li {
      font-size: 24px;
      h2 {
        font-size: inherit;
        margin: 0;
        a {
          color: var(--light-slate);
        }
      }
      .subtitle {
        color: var(--slate);
        font-size: var(--fz-sm);

        .tag {
          margin-right: 10px;
        }
      }
    }
  }
`;

const TagPage = ({ tag, posts }) => {
  return (
    <Layout headProps={{ title: `Tagged: #${tag}` }}>
      <StyledTagsContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link href={`/${BLOG}`}>{ALL_BLOG_POSTS_MESSAGE}</Link>
        </span>

        <h1>
          <span>#{tag}</span>
          <span>
            <Link href={`/${BLOG}/tags`}>View all tags</Link>
          </span>
        </h1>

        <ul className="fancy-list">
          {posts.map(({ frontmatter }) => {
            const { title, slug, date, tags = [] } = frontmatter;
            return (
              <li key={slug}>
                <h2>
                  <Link href={slug}>{title}</Link>
                </h2>
                <p className="subtitle">
                  <time>
                    {new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>&nbsp;&mdash;&nbsp;</span>
                  {tags.map((item, i) => (
                    <Link key={i} href={`/${BLOG}/tags/${kebabCase(item)}/`} className="tag">
                      #{item}
                    </Link>
                  ))}
                </p>
              </li>
            );
          })}
        </ul>
      </StyledTagsContainer>
    </Layout>
  );
};

export async function getStaticPaths() {
  const groups = await getTagGroups();
  return {
    paths: groups.map(group => ({ params: { tag: kebabCase(group.fieldValue) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const groups = await getTagGroups();
  const current = groups.find(group => kebabCase(group.fieldValue) === params.tag);

  if (!current) {
    return { notFound: true };
  }

  const posts = await getBlogPostsByTag(current.fieldValue);

  return {
    props: {
      tag: current.fieldValue,
      posts,
    },
  };
}

export default TagPage;
