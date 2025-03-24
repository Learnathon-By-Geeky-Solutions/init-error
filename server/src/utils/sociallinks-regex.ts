interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

interface SocialPatterns {
  [key: string]: RegExp;
}

export const validateSocialLinks = (
  socialLinks: SocialLinks
): string | null => {
  const socialPatterns: SocialPatterns = {
    twitter: /^https:\/\/(www\.)?(twitter|x)\.com\/[A-Za-z0-9_]+$/,
    linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+$/,
    github: /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+$/,
    facebook: /^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.-]+$/,
    dribbble: /^https:\/\/(www\.)?dribbble\.com\/[A-Za-z0-9_-]+$/,
    figma: /^https:\/\/(www\.)?figma\.com\/[A-Za-z0-9_-]+$/,
  };

  for (const [platform, url] of Object.entries(socialLinks)) {
    if (!socialPatterns[platform]) {
      return `Invalid platform: ${platform}`;
    }
    if (!socialPatterns[platform].test(url)) {
      return `Invalid URL format for ${platform}`;
    }
  }
  return null;
};
