const footerLinks = [
  {
    title: 'Về chúng tôi',
    links: [
      { text: 'Khám phá', href: '#' },
      { text: 'Tuyển dụng', href: '#' },
      { text: 'Liên hệ', href: '#' }
    ]
  },
  {
    title: 'Khác',
    links: [
      { text: 'Điều khoản sử dụng', href: '#' },
      { text: 'Chính sách bảo mật', href: '#' },
      { text: 'Trung tâm liên hệ', href: '#' }
    ]
  }
];

const FooterLinks = () => {
  return (
    <div className='col-span-3 col-start-5'>
      <div className='grid grid-cols-2'>
        {footerLinks.map((section, index) => (
          <div key={index}>
            <p className='mb-7 text-lg font-semibold'>{section.title}</p>
            <ul className='flex flex-col gap-5 text-sm font-medium'>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FooterLinks;
