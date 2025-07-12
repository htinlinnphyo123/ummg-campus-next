import Head from "next/head";

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  favicon?: string;
}

export const Seo = ({
  title = "University of Medicine Magway",
  description = "Welcome to University of Medicine Magway",
  image = "/images/ummg/uni_logo.png",
  url = "https://ummgcampus.org",
  favicon = "/favicon.ico",
}: SeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      {/* Favicon */}
      <link rel="icon" href={favicon} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
