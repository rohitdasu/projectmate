// generateSitemap.ts
import * as fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

const generateSitemap = async () => {
  const sitemap = new SitemapStream({
    hostname: 'https://projectmate.rohitdasu.com',
  });

  ['/', '/explore', '/community'].forEach((url) => sitemap.write({ url }));

  sitemap.end();

  // Convert the stream to a promise and save the sitemap to a file
  const sitemapXML = await streamToPromise(sitemap)
    .then((data) => data.toString())
    .catch((error) => {
      console.error('Error converting stream to promise:', error);
      return '';
    });

  fs.writeFileSync('./public/sitemap.xml', sitemapXML);

  console.log('Sitemap created successfully!');
};

generateSitemap();
