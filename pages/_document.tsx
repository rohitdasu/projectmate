/* eslint-disable @next/next/next-script-for-ga */
import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { extractCritical } from '@emotion/server';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const critical = extractCritical(initialProps.html);
    initialProps.html = critical.html;
    initialProps.styles = (
      <React.Fragment>
        {initialProps.styles}
        <style
          data-emotion-css={critical.ids.join(' ')}
          dangerouslySetInnerHTML={{ __html: critical.css }}
        />
      </React.Fragment>
    );

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Projectmate is a platform that connects open-source enthusiasts with repository owners and maintainers looking for contributors."
          />
          <meta
            name="keywords"
            content="opensource, github, reactjs, nextjs, technology"
          />
          <meta name="robots" content="index,follow" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="2 days" />
          <meta name="author" content="Rohit Dasu" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.projectmate.net/" />
          <meta
            property="og:title"
            content="Start Contributing to Open Source Projects"
          />
          <meta
            property="og:description"
            content="Projectmate is a platform that connects open-source enthusiasts with repository owners and maintainers looking for contributors."
          />
          <meta
            property="og:image"
            content="https://user-images.githubusercontent.com/48400770/190438248-fc0f3e42-c6d3-4d07-bcba-10e7fece4bc2.png"
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://www.projectmate.net/" />
          <meta
            property="twitter:title"
            content="Start Contributing to Open Source Projects"
          />
          <meta
            property="twitter:description"
            content="Projectmate is a platform that connects open-source enthusiasts with repository owners and maintainers looking for contributors."
          />
          <meta
            property="twitter:image"
            content="https://user-images.githubusercontent.com/48400770/190438248-fc0f3e42-c6d3-4d07-bcba-10e7fece4bc2.png"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KSS8T4M');`,
            }}
          />
          <script
            data-name="BMC-Widget"
            data-cfasync="false"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-id="rohit.dasu"
            data-description="Support me on Buy me a coffee!"
            data-message=""
            data-color="#FF813F"
            data-position="left"
            data-x_margin="22"
            data-y_margin="22"
            defer
          />
        </Head>
        <body className="bg-background-1">
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KSS8T4M"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
