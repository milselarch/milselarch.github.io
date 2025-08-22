import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import config from '@/config';
import sr from '@/utils/sr';
import { usePrefersReducedMotion } from '@/hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(4, minmax(140px, 400px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--highlight);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--highlight);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--dark-bg);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--highlight);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, config.srConfig());
  }, []);

  /*
  const recentSkills = [
    'Golang', 'PostgreSQL', 'Docker',
    'TypeScript', 'tailwind-css', 'React',
  ];
  */

  const skills = [
    'Python',
    'Golang',
    'Rust',
    'C',
    'C++',
    'C#',
    'Java',
    'JavaScript',
    'TypeScript',
    'PHP',
    'Django',
    'Flask',
    'FastAPI',
    'React',
    'VueJS',
    'jQuery',
    'MySQL',
    'PostgreSQL',
    'MariaDB',
    'Redis',
    'Docker',
    'Linux',
    'AWS',
    'GCP',
    'PyTorch',
    'TensorFlow',
    'Keras',
    'Playwright',
    'Selenium',
    'tailwind-css',
    'SCSS',
    'HTML',
    'CSS',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hi, my name is Charles, and I love building things with code. My programming journey
              started when I wanted to learn how to make video games, and since then I’ve been using
              code to work on all sorts of projects from games to websites to IOT devices to mobile
              apps.
            </p>

            <p>
              As far as work experience goes, I’ve primarily been focused on full stack web
              development. During my internship at Panasonic, I worked on a web app that allowed
              users to interact with, create routes for, and view analysis results from a building
              inspection robot. And in my current role at Concorde Security, I am working on
              creating streamlined visitor management and attendance taking systems.
            </p>

            <p>Technologies I've worked with include: </p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['auto', 'webp', 'avif']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
