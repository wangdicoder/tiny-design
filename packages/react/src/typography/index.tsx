import Heading from './heading';
import Typography from './typography';
import Paragraph from './paragraph';
import Text from './text';

type ITypography = typeof Typography & {
  Heading: typeof Heading;
  Paragraph: typeof Paragraph;
  Text: typeof Text;
};

const DefaultTypo = Typography as ITypography;
DefaultTypo.Heading = Heading;
DefaultTypo.Paragraph = Paragraph;
DefaultTypo.Text = Text;

export { Heading, Paragraph, Text };
export default DefaultTypo;
export type * from './types';
