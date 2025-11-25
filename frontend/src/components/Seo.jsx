// Seo.jsx
import { Helmet } from '@dr.pogodin/react-helmet';

function Seo({ title, description, path }) {
  const siteUrl = "https://yourdomain.com"; // ← change later
  const fullUrl = `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{title} - Free Online Tools</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${siteUrl}/og-preview.jpg`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/og-preview.jpg`} />

      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}

export default Seo;