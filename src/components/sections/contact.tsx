import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import config from '@/config.js';
import { srConfig } from '@/config.js';
import sr from '@/utils/sr';
import { usePrefersReducedMotion } from '@/hooks';
import {BLOG} from "@/utils/constants";

const email = config.email;

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--highlight);
    font-family: var(--font-mono), sans-serif;
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  div.buttons-box {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;

    & > a.button-link {
      ${({ theme }) => `${theme.mixins.bigButton}`};
      margin-top: 50px;
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        Although I’m not currently looking for any new opportunities, my inbox is always open.
        Whether you have a question or just want to say hi, do feel free to contact me
        at <a className="inline-link" href={`mailto:${email}`}>
          {email}
        </a>
      </p>

      <div className="buttons-box">
        <a className="button-link" href={`mailto:${email}`}>
          Say Hello
        </a>
        {/* TODO: is there a way to dynamically bind the blog href or is that overkill lol */}
        <a className="button-link" href={"/" + BLOG}>
          View Blog
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
