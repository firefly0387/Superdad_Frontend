import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  noIndex?: boolean;
}

const SITE_NAME = "SuperDad";
const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function SEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = "website",
  noIndex = false,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{fullTitle}</title>

      <meta name="description" content={description} />


      <meta
        name="robots"
        content={noIndex ? "noindex,nofollow" : "index,follow"}
      />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}
