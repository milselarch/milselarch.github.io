import { css } from 'styled-components';

// @ts-ignore
import CalibreRegularWoff from '@/fonts/Calibre/Calibre-Regular.woff';
// @ts-ignore
import CalibreRegularWoff2 from '@/fonts/Calibre/Calibre-Regular.woff2';
// @ts-ignore
import CalibreMediumWoff from '@/fonts/Calibre/Calibre-Medium.woff';
// @ts-ignore
import CalibreMediumWoff2 from '@/fonts/Calibre/Calibre-Medium.woff2';
// @ts-ignore
import CalibreSemiboldWoff from '@/fonts/Calibre/Calibre-Semibold.woff';
// @ts-ignore
import CalibreSemiboldWoff2 from '@/fonts/Calibre/Calibre-Semibold.woff2';

// @ts-ignore
import CalibreRegularItalicWoff from '@/fonts/Calibre/Calibre-RegularItalic.woff';
// @ts-ignore
import CalibreRegularItalicWoff2 from '@/fonts/Calibre/Calibre-RegularItalic.woff2';
// @ts-ignore
import CalibreMediumItalicWoff from '@/fonts/Calibre/Calibre-MediumItalic.woff';
// @ts-ignore
import CalibreMediumItalicWoff2 from '@/fonts/Calibre/Calibre-MediumItalic.woff2';
// @ts-ignore
import CalibreSemiboldItalicWoff from '@/fonts/Calibre/Calibre-SemiboldItalic.woff';
// @ts-ignore
import CalibreSemiboldItalicWoff2 from '@/fonts/Calibre/Calibre-SemiboldItalic.woff2';

// @ts-ignore
import SFMonoRegularWoff from '@/fonts/SFMono/SFMono-Regular.woff';
// @ts-ignore
import SFMonoRegularWoff2 from '@/fonts/SFMono/SFMono-Regular.woff2';
// @ts-ignore
import SFMonoSemiboldWoff from '@/fonts/SFMono/SFMono-Semibold.woff';
// @ts-ignore
import SFMonoSemiboldWoff2 from '@/fonts/SFMono/SFMono-Semibold.woff2';

// @ts-ignore
import SFMonoRegularItalicWoff from '@/fonts/SFMono/SFMono-RegularItalic.woff';
// @ts-ignore
import SFMonoRegularItalicWoff2 from '@/fonts/SFMono/SFMono-RegularItalic.woff2';
// @ts-ignore
import SFMonoSemiboldItalicWoff from '@/fonts/SFMono/SFMono-SemiboldItalic.woff';
// @ts-ignore
import SFMonoSemiboldItalicWoff2 from '@/fonts/SFMono/SFMono-SemiboldItalic.woff2';

const calibreNormalWeights = {
  400: [CalibreRegularWoff, CalibreRegularWoff2],
  500: [CalibreMediumWoff, CalibreMediumWoff2],
  600: [CalibreSemiboldWoff, CalibreSemiboldWoff2],
};

const calibreItalicWeights = {
  400: [CalibreRegularItalicWoff, CalibreRegularItalicWoff2],
  500: [CalibreMediumItalicWoff, CalibreMediumItalicWoff2],
  600: [CalibreSemiboldItalicWoff, CalibreSemiboldItalicWoff2],
};

const sfMonoNormalWeights = {
  400: [SFMonoRegularWoff, SFMonoRegularWoff2],
  600: [SFMonoSemiboldWoff, SFMonoSemiboldWoff2],
};

const sfMonoItalicWeights = {
  400: [SFMonoRegularItalicWoff, SFMonoRegularItalicWoff2],
  600: [SFMonoSemiboldItalicWoff, SFMonoSemiboldItalicWoff2],
};

const calibre = {
  name: 'Calibre',
  normal: calibreNormalWeights,
  italic: calibreItalicWeights,
};

const sfMono = {
  name: 'SF Mono',
  normal: sfMonoNormalWeights,
  italic: sfMonoItalicWeights,
};

const createFontFaces = (family, style = 'normal') => {
  let styles = '';

  for (const [weight, formats] of Object.entries(family[style])) {
    const woff = formats[0];
    const woff2 = formats[1];

    styles += `
      @font-face {
        font-family: '${family.name}';
        src: url(${woff2}) format('woff2'),
            url(${woff}) format('woff');
        font-weight: ${weight};
        font-style: ${style};
        font-display: auto;
      }
    `;
  }

  return styles;
};

const calibreNormal = createFontFaces(calibre);
const calibreItalic = createFontFaces(calibre, 'italic');

const sfMonoNormal = createFontFaces(sfMono);
const sfMonoItalic = createFontFaces(sfMono, 'italic');

const Fonts = css`
  ${calibreNormal + calibreItalic + sfMonoNormal + sfMonoItalic}
`;

export default Fonts;
