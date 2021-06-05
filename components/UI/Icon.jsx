import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_2594633_49s9qf35auq.js'],
});

function Icon({ type, className }) {
  return <IconFont type={type} className={className} />;
}

export default Icon;
