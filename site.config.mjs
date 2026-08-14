const rawSiteUrl = (process.env.SITE_URL ?? '').trim();
const siteUrl = rawSiteUrl ? rawSiteUrl.replace(/\/+$/, '') : '';
const hasSiteUrl = siteUrl.length > 0;
const fallbackSiteUrl = 'https://blog.ssean.cn';
const siteUrlWarningFlag = 'ASTRO_WHONO_SITE_URL_WARNING_SHOWN';

if (
  !hasSiteUrl &&
  process.env.NODE_ENV === 'production' &&
  process.env[siteUrlWarningFlag] !== '1'
) {
  process.env[siteUrlWarningFlag] = '1';
  console.warn(
    '[astro-whono] SITE_URL is not set. RSS will use example.invalid; canonical/og will be omitted; sitemap will not be generated and robots will not include Sitemap.'
  );
}

export const site = {
  url: hasSiteUrl ? siteUrl : fallbackSiteUrl,
  title: 'Sean\'s Blog',
  brandTitle: 'Sean',
  author: 'Sean',
  authorAvatar: 'author/avatar.webp',
  description: '一个分享世界的地方'
};

export const PAGE_SIZE_ARCHIVE = 12;
export const PAGE_SIZE_ESSAY = 12;
export const PAGE_SIZE_BITS = 20;

export { hasSiteUrl, siteUrl };
