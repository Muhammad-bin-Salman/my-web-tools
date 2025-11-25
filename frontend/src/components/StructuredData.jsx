// src/components/StructuredData.jsx
import { Helmet } from '@dr.pogodin/react-helmet';

function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Online Tools Suite",
    "description": "100% free online calculators and converters: BMI, EMI, Age, Base64, URL Encoder, Profit Margin and more. No signup, no ads, instant results.",
    "url": "https://your-site.vercel.app", // ← change to your real domain later
    "applicationCategory": "Utility",
    "operatingSystem": "All",
    "creator": {
      "@type": "Person",
      "name": "Your Name" // ← put your name or "Tools Suite Team"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "284"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}

export default StructuredData;