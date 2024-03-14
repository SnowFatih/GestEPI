import { RefObject, useEffect } from 'react';

import { isVisible, scrollTo } from '@/utils/dom';

export const useScrollListEffect = (listRef: RefObject<HTMLDivElement>, selectedId?: number, effectDependecies: any[] = []) => {
  useEffect(() => {
    if (listRef.current && selectedId) {
      const stringId = `${selectedId}`;
      const element = document.getElementById(stringId);
      const itemVisible = isVisible(element, listRef.current);
      if (!itemVisible) {
        scrollTo(stringId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, listRef, ...effectDependecies]);
};
