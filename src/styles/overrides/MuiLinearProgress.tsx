// Palette
import palette from '../palette';
import { StyleRules } from '@material-ui/core/styles';
import { LinearProgressClassKey } from '@material-ui/core/LinearProgress';

export default {
  root: {
    borderRadius: '3px',
    overflow: 'hidden'
  },
  colorPrimary: {
    backgroundColor: palette.common.neutral
  }
} as Partial<StyleRules<LinearProgressClassKey>>;
