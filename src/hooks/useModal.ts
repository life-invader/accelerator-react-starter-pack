import { useCallback, useEffect } from 'react';

type UseModalCallbackType = () => void;

export const useModal = (callback: UseModalCallbackType) => {
  const blockScroll = () => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth; // ширина скролла справа
    const bodyPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), 10) || 0; // отступ справа

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    document.body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
  };

  const allowScroll = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    const element = evt.target as HTMLElement;

    if (evt.key === 'Escape') {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        return;
      }
      callback();
    }
  }, [callback]);

  useEffect(() => {
    document.body.addEventListener('keydown', handleEscapeKeydown);
    blockScroll();

    return () => {
      document.body.removeEventListener('keydown', handleEscapeKeydown);
      allowScroll();
    };
  }, [handleEscapeKeydown]);
};
