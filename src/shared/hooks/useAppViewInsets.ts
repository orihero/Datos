import {useMemo} from 'react';
import {StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalizeHeight} from 'shared/utils/dimensions';
import {isAndroid, isIOS} from 'shared/utils/platform';

const BASE_TOP = 35;
export const useAppViewInsets = () => {
  const {top, bottom} = useSafeAreaInsets();
  const statusBarHeight = StatusBar.currentHeight;

  const paddingTop = useMemo(() => {
    if (isIOS) {
      return (top > BASE_TOP ? BASE_TOP : top) || BASE_TOP;
    }
    if (isAndroid) {
      return statusBarHeight ? BASE_TOP * 0.2 : BASE_TOP;
    }
    return BASE_TOP;
  }, [top, statusBarHeight]);

  const paddingBottom = useMemo(
    () => (bottom > 24 ? 24 : bottom || 24),
    [bottom],
  );
  return {
    paddingTop: normalizeHeight(paddingTop),
    paddingBottom: normalizeHeight(paddingBottom),
  };
};
