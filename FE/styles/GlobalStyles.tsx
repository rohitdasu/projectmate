import React from 'react';
import { Global } from '@emotion/react';
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro';
import { css } from '@emotion/react'; // it should be imported from "twin.macro" but there was some error so importing from here

const customStyles = css({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
