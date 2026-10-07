// Portfolio destinations, exactly as listed on the resume.
export const portfolioLinks = {
  portraits: "https://drive.google.com/drive/folders/1-4Py3F8Gk0lFGT2lA4lCYnjKnbmkoBBr",
  wildlife: "https://drive.google.com/drive/folders/123f8Rv-eMw-BLip8r4k1XHXsQIHwHfST",
  concerts: "https://drive.google.com/drive/folders/14ts3lZO3iJrI_YeBD5l6NHPFhWVhsuaz",
} as const;

export type PortfolioSlug = keyof typeof portfolioLinks;
