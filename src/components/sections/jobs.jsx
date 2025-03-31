import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const EMPTY_TAB_ID = -1;

const StyledJobsSection = styled.section`
  max-width: 700px;

  .inner {
    display: flex;

    & div.tabs {
      flex-direction: column;
      display: flex;
    }

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }

  br.padding {
    margin-bottom: 1rem;
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: auto;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--text-highlight);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--text-highlight);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--foreground-color);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--highlight);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--highlight);
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono), sans-serif;
    font-size: var(--fz-xs);
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
      education: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/education/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;
  const educationData = data.education.edges;
  // eslint-disable-next-line no-console
  console.log('EDUCATION DATA', educationData);

  const [activeJobsTabId, setActiveJobsTabId] = useState(0);
  const [activeEducationTabId, setActiveEducationTabId] = useState(-1);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  const setTabIndexes = (jobIndex, educationIndex) => {
    setActiveJobsTabId(jobIndex);
    setActiveEducationTabId(educationIndex);
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">
        <span>Work</span> &nbsp;&&nbsp;
        <span>Education</span>
      </h2>

      <div className="inner">
        <div className="tabs">
          <h4> Job History </h4>
          <StyledTabList
            role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}
            className="w-full"
          >
            {jobsData &&
              jobsData.map(({ node }, i) => {
                const { company } = node.frontmatter;
                return (
                  <StyledTabButton
                    key={i}
                    isActive={activeJobsTabId === i}
                    onClick={() => setTabIndexes(i, EMPTY_TAB_ID)}
                    ref={el => (tabs.current[i] = el)}
                    id={`tab-${i}`}
                    role="tab"
                    tabIndex={activeJobsTabId === i ? '0' : '-1'}
                    aria-selected={activeJobsTabId === i}
                    aria-controls={`panel-${i}`}>
                    <span>{company}</span>
                  </StyledTabButton>
                );
              })
            }
            {(activeJobsTabId !== EMPTY_TAB_ID) &&
              <StyledHighlight activeTabId={activeJobsTabId} />
            }
          </StyledTabList>

          <br className="padding" />

          <h4> Education </h4>
          <StyledTabList
            role="tablist" aria-label="Education tabs" onKeyDown={e => onKeyDown(e)}
            className="w-full"
          >
            {educationData &&
              educationData.map(({ node }, i) => {
                const { company } = node.frontmatter;
                return (
                  <StyledTabButton
                    key={i}
                    isActive={activeEducationTabId === i}
                    onClick={() => setTabIndexes(EMPTY_TAB_ID, i)}
                    ref={el => (tabs.current[i] = el)}
                    id={`tab-${i}`}
                    role="tab"
                    tabIndex={activeEducationTabId === i ? '0' : '-1'}
                    aria-selected={activeEducationTabId === i}
                    aria-controls={`panel-${i}`}>
                    <span>{company}</span>
                  </StyledTabButton>
                );
              })}
            {activeEducationTabId !== EMPTY_TAB_ID && (
              <StyledHighlight activeTabId={activeEducationTabId} />
            )}
          </StyledTabList>
        </div>

        {activeJobsTabId !== EMPTY_TAB_ID && (
          <StyledTabPanels>
            {jobsData &&
              jobsData.map(({ node }, i) => {
                const { frontmatter, html } = node;
                const { title, url, company, range } = frontmatter;

                return (
                  <CSSTransition key={i} in={activeJobsTabId === i} timeout={250} classNames="fade">
                    <StyledTabPanel
                      id={`panel-${i}`}
                      role="tabpanel"
                      tabIndex={activeJobsTabId === i ? '0' : '-1'}
                      aria-labelledby={`tab-${i}`}
                      aria-hidden={activeJobsTabId !== i}
                      hidden={activeJobsTabId !== i}>
                      <h3>
                        <span>{title}</span>
                        <span className="company">
                          &nbsp;@&nbsp;
                          <a href={url} className="inline-link">
                            {company}
                          </a>
                        </span>
                      </h3>

                      <p className="range">{range}</p>

                      <div dangerouslySetInnerHTML={{ __html: html }} />
                    </StyledTabPanel>
                  </CSSTransition>
                );
              })}
          </StyledTabPanels>
        )}

        {activeEducationTabId !== EMPTY_TAB_ID && (
          <StyledTabPanels>
            {educationData &&
              educationData.map(({ node }, i) => {
                const { frontmatter, html } = node;
                const { title, url, company, range } = frontmatter;

                return (
                  <CSSTransition
                    key={i}
                    in={activeEducationTabId === i}
                    timeout={250}
                    classNames="fade">
                    <StyledTabPanel
                      id={`panel-${i}`}
                      role="tabpanel"
                      tabIndex={activeEducationTabId === i ? '0' : '-1'}
                      aria-labelledby={`tab-${i}`}
                      aria-hidden={activeEducationTabId !== i}
                      hidden={activeEducationTabId !== i}>
                      <h3>
                        <span>{title}</span>
                        <span className="company">
                          &nbsp;@&nbsp;
                          <a href={url} className="inline-link">
                            {company}
                          </a>
                        </span>
                      </h3>

                      <p className="range">{range}</p>

                      <div dangerouslySetInnerHTML={{ __html: html }} />
                    </StyledTabPanel>
                  </CSSTransition>
                );
              })}
          </StyledTabPanels>
        )}
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
