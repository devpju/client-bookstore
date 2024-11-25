import InstagramLogoIcon from '@/assets/icons/instagram.svg?react';
import TwitterLogoIcon from '@/assets/icons/twitter.svg?react';
import LinkedinLogoIcon from '@/assets/icons/linkedin.svg?react';
import FacebookLogoIcon from '@/assets/icons/facebook.svg?react';
const socialLinks = [
  { href: '#', Icon: FacebookLogoIcon },
  { href: '#', Icon: TwitterLogoIcon },
  { href: '#', Icon: LinkedinLogoIcon },
  { href: '#', Icon: InstagramLogoIcon }
];

const SocialMediaLinks = () => {
  return (
    <div className='flex items-center gap-7'>
      {socialLinks.map((socialLink, index) => (
        <a key={index} href={socialLink.href}>
          <socialLink.Icon />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
