// Components for proper Google Analytics tracking in Next.js App Router
'use client';

import Script from 'next/script';

export default function GoogleAnalytics({ gaId }: { gaId?: string }) {
  // Get GA ID from environment variable or props
  const googleAnalyticsId = gaId || process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  // Don't render GA if no ID is provided
  if (!googleAnalyticsId) {
    console.warn(
      'Google Analytics ID not found. Please set NEXT_PUBLIC_GOOGLE_ANALYTICS_ID environment variable.',
    );
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}', {
            page_path: window.location.pathname,
            send_page_view: true,
            anonymize_ip: true,
            custom_map: {
              custom_parameter_1: 'page_type',
              custom_parameter_2: 'user_type'
            }
          });
        `}
      </Script>
    </>
  );
}
