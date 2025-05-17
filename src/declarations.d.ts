import 'styled-components';

import FlattenSimpleInterpolation, {FastOmit, Interpolation} from 'styled-components';
import {GatsbyLinkProps, Link} from "gatsby";
import {DetailedHTMLProps, HTMLAttributes, RefAttributes} from "react";


declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    mixins: {
      bigButton: Interpolation<
        FastOmit<Omit<GatsbyLinkProps<unknown>, 'ref'> & RefAttributes<Link<unknown>>, never>
      >;
      flexCenter: Interpolation<
        FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, never>
      >;
      inlineLink: typeof FlattenSimpleInterpolation;
      button: typeof FlattenSimpleInterpolation;
      // Add other mixins as needed
    };
  }
}
