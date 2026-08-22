import React from 'react';
import Link from 'next/link';
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';
import { Layout } from '@/components';
import { ALL_BLOG_POSTS_MESSAGE, BLOG } from '@/utils/constants';
import { getTagGroups } from '@/lib/content';

const StyledTagsContainer = styled.main`
  max-width: 1000px;

  h1 {
    margin-bottom: 50px;
  }
  ul {
    color: var(--light-slate);

    li {
      font-size: var(--fz-xxl);

      a {
        color: var(--light-slate);

        .count {
          color: var(--slate);
          font-family: var(--font-mono), sans-serif;
          font-size: var(--fz-md);
        }
      }
    }
  }
`;

const TagsPage = ({ group }) => (
  <Layout headProps={{ title: 'Tags' }}>
    <StyledTagsContainer>
      <span className="breadcrumb">
        <span className="arrow">&larr;</span>
        <Link href={`/${BLOG}`}>{ALL_BLOG_POSTS_MESSAGE}</Link>
      </span>

      <h1>Tags</h1>
      <ul className="fancy-list">
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link href={`/${BLOG}/tags/${kebabCase(tag.fieldValue)}/`} className="inline-link">
              {tag.fieldValue} <span className="count">({tag.totalCount})</span>
            </Link>
          </li>
        ))}
      </ul>
    </StyledTagsContainer>
  </Layout>
);

export async function getStaticProps() {
  const group = await getTagGroups();
  return { props: { group } };
}

export default TagsPage;
