import { useMemo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

/**
 *
 * @param {('xs'|'sm'|'md'|'lg'|'xl')} breakpoint the breakpoint to check (e.g. 'md', 'lg')
 * @returns {boolean} returns true is the screen size is less than or equal to the breakpoint, or if the user agent is mobile
 */
const useIsMobile = (breakpoint) => {
  const theme = useTheme();
  const matchesBreakPoint = useMediaQuery(theme.breakpoints.down(breakpoint));
  const isUserAgentMobile = useMemo(() => /Mobi|Android/i.test(navigator.userAgent), []);
  return matchesBreakPoint || isUserAgentMobile;
};

export default useIsMobile;
