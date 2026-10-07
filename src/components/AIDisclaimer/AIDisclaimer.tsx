import { useMemo } from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../theme';
import { createStyles } from './AIDisclaimer.styles';

const DISCLAIMER = 'AI-generated — may contain errors. Verify important information.';

function AIDisclaimer() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return <Text style={styles.text}>{DISCLAIMER}</Text>;
}

export default AIDisclaimer;
