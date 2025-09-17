import { CSSTransition } from 'react-transition-group';
import config from '@/config';
import React from 'react';
import {Link} from "gatsby";

type NavLinksGroupParams = {
  isHome?: boolean;
  timeout?: number
}

export function NavLinksGroup({
  isHome = false,
  timeout = 0
}: NavLinksGroupParams) {
  const fadeDownClass = isHome ? 'fade-down' : '';

  return (
    <ol>
      {config.navLinks && config.navLinks.map((link, i) => (
        <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
          <li key={i} style={{transitionDelay: `${isHome ? i * 100 : 0}ms`}}>
            <Link to={link.url}>{link.name}</Link>
          </li>
        </CSSTransition>
      ))}
    </ol>
  )
}
