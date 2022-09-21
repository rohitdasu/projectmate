import React from 'react';
import { Global } from '@emotion/react';
import className, { theme, GlobalStyles as BaseStyles } from 'twin.macro';
import { css } from '@emotion/react'; // it should be imported from "twin.macro" but there was some error so importing from here

const customStyles = css({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...className`antialiased`,
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
