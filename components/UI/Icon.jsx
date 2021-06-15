import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_2594633_witmtpy7nb.js'],
});

function Icon({ type, className }) {
  return <IconFont type={type} className={className} />;
}

export default Icon;
