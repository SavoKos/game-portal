import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_2594633_mlrrv6zlt8.js'],
});

function Icon({ type, className, onClick }) {
  return <IconFont type={type} className={className} onClick={onClick} />;
}

export default Icon;
