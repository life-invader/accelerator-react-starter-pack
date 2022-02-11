import { useCallback, useEffect } from 'react';

const NUMBER_SYSTEM = 10;
type UseModalCallbackType = () => void;

export const useModal = (closeModal: UseModalCallbackType) => {
  const blockScroll = () => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth; // ширина скролла справа
    const bodyPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), NUMBER_SYSTEM) || 0; // отступ справа

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
      closeModal();
    }
  }, [closeModal]);

  useEffect(() => {
    document.body.addEventListener('keydown', handleEscapeKeydown);
    blockScroll();

    return () => {
      document.body.removeEventListener('keydown', handleEscapeKeydown);
      allowScroll();
    };
  }, [handleEscapeKeydown]);
};
