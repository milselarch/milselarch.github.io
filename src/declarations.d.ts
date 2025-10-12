import 'styled-components';

import FlattenSimpleInterpolation, {FastOmit, Interpolation} from 'styled-components';
import {GatsbyLinkProps, Link} from "gatsby";
import {ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, LiHTMLAttributes, RefAttributes} from 'react';

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
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
      flexBetween: any;
      smallButton: Interpolation<
        FastOmit<DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, never>
      >;
      resetList: Interpolation<
        FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>, never>
      >;
      boxShadow: Interpolation<
        FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>
      >;
      link: Interpolation<
        FastOmit<
          DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
          never
        >
      >;
      fancyList: Interpolation<
        FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>
      >;
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
