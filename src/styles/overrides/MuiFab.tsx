// Palette
import palette from '../palette';
import { StyleRules } from '@material-ui/core/styles';
import { FabClassKey } from '@material-ui/core/Fab';

export default {
  root: {
    backgroundColor: palette.common.white,
    color: palette.text.secondary,
    '&:hover': {
      backgroundColor: palette.common.neutral
    }
  }
} as Partial<StyleRules<FabClassKey>>;
