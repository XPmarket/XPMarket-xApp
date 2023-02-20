import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  motion,
  PanInfo,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion';

import { Box } from '@mui/material';
import useEventListener from '@use-it/event-listener';
import { NftSwipeListItem } from '@xpmarket/xpm.api.xpmarket';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import {
  ExpandableImageContainer,
  RawImage,
} from '@xpmarket/xpm.ui.gallery.expandable-image';

import { CardRefElement, SwipeDirection } from '../types';
import { NftinderSwipeCardContainer } from './NftinderSwipeCardContainer';

interface Props {
  nft: NftSwipeListItem;
  isActive: boolean;
  isAtBreakpoint: boolean;
  onImageError: (nft: NftSwipeListItem) => void;
  onVote?: (direction: SwipeDirection) => void;
  onDragDirectionChange?: (direction: SwipeDirection | undefined) => void;
}

const Component = (
  props: Props,
  ref: ForwardedRef<CardRefElement>
): JSX.Element | null => {
  const {
    nft,
    onVote,
    onImageError,
    onDragDirectionChange,
    isAtBreakpoint,
    isActive,
  } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const lastDragDirection = useRef<SwipeDirection | undefined>(undefined);
  const isDraggingRef = useRef<boolean>(false);
  const xMotionValue = useMotionValue(0);
  const controls = useAnimation();
  const rotateZ = useTransform(xMotionValue, [-100, 0, 100], [-5, 0, 5]);
  const opacity = useTransform(xMotionValue, [-100, 0, 100], [0.6, 1, 0.6]);
  const loadingStrategy = isActive ? 'eager' : 'lazy';

  useImperativeHandle(ref, () => ({
    onActionClick(direction: SwipeDirection) {
      vote(direction);
    },
  }));

  useEventListener('keydown', handleKeyDown);

  // Used to create swipe animation
  useEffect(() => {
    const unsubscribeX = xMotionValue.onChange(() => {
      if (cardRef.current) {
        const childNode = cardRef.current;
        const parentNode = cardRef.current.parentElement;
        const result = getDirectionAtEndDistance(childNode, parentNode);

        if (result !== undefined && !isDraggingRef.current) {
          onVote?.(result);
        }
      }
    });

    return () => unsubscribeX();
  }, [onVote, xMotionValue]);

  return (
    <Box sx={styles.getValue('root')}>
      <ExpandableImageContainer
        src={nft.image}
        alt={nft.name}
        sx={styles.getValue('imageContainer')}
        loadingStrategy={loadingStrategy}
      >
        <motion.div
          animate={controls}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={isAtBreakpoint ? 0.7 : 0.4}
          ref={cardRef}
          style={{ x: xMotionValue, rotateZ, opacity }}
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
          whileTap={{
            scale: 1.02,
          }}
          drag={true}
          onPointerDown={handlePointerDown}
        >
          <NftinderSwipeCardContainer>
            <RawImage
              src={nft.image}
              alt={nft.name}
              sx={styles.getValue('image')}
              onError={() => onImageError(nft)}
              loadingStrategy={loadingStrategy}
            />
          </NftinderSwipeCardContainer>
        </motion.div>
      </ExpandableImageContainer>
    </Box>
  );

  function handlePointerDown(): void {
    // Reset card to its original position
    controls.start({
      x: 0,
      y: 0,
    });
  }

  function handleKeyDown(event): void {
    // Do not trigger key down events for background cards
    if (!isActive) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      vote('left');
    }
    if (event.key === 'ArrowRight') {
      vote('right');
    }
  }

  function handleDrag(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void {
    const xOffset = info.offset.x;
    // Only check for offset changes
    const direction = getDirection(undefined, xOffset, isAtBreakpoint);

    if (lastDragDirection.current !== direction) {
      handleDragDirectionChange(direction);
    }

    isDraggingRef.current = true;
  }

  function handleDragDirectionChange(
    direction: SwipeDirection | undefined
  ): void {
    lastDragDirection.current = direction;

    onDragDirectionChange?.(direction);
  }

  function handleDragEnd(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void {
    const xVelocity = info.velocity.x;
    const xOffset = info.offset.x;
    const direction = getDirection(xVelocity, xOffset, isAtBreakpoint);

    if (direction) {
      vote(direction);
    }

    handleDragDirectionChange(undefined);
    isDraggingRef.current = false;
  }

  function vote(direction: SwipeDirection): void {
    controls.start({
      x: calcFlyAwayDistance(cardRef.current, direction),
    });
  }
};

export const NftinderSwiperCard = forwardRef(Component);

const calcFlyAwayDistance = (
  cardEl: HTMLDivElement | null,
  direction: SwipeDirection
): number => {
  const parentWidth = cardEl?.parentElement?.getBoundingClientRect().width ?? 0;
  const childWidth = cardEl?.getBoundingClientRect().width ?? 0;

  return direction === 'left'
    ? -parentWidth / 2 - childWidth / 2
    : parentWidth / 2 + childWidth / 2;
};

const getDirection = (
  xVelocity: number | undefined,
  xOffset: number,
  isAtBreakpoint: boolean
): SwipeDirection | undefined => {
  const minimumDragOffset = isAtBreakpoint ? 80 : 150;
  const minimumDragVelocity = 300;

  if (xOffset > minimumDragOffset) {
    return 'right';
  }
  if (xOffset < -minimumDragOffset) {
    return 'left';
  }

  if (xVelocity) {
    if (xVelocity >= minimumDragVelocity) {
      return 'right';
    }
    if (xVelocity <= -minimumDragVelocity) {
      return 'left';
    }
  }

  return undefined;
};

const getDirectionAtEndDistance = (
  childNode: HTMLDivElement,
  parentNode: HTMLElement | null
) => {
  const childRect = childNode.getBoundingClientRect();
  const parentRect = parentNode?.getBoundingClientRect();
  const offset = 200;

  if (parentRect && parentRect.left + offset >= childRect.right) {
    return 'left';
  }
  if (parentRect && parentRect.right - offset <= childRect.left) {
    return 'right';
  }

  return undefined;
};

const styles = new SxStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: '1',
  },
  card: {
    p: 0,
  },
  imageContainer: {
    width: 'inherit',
    height: 'inherit',
  },
  image: {
    objectFit: 'cover',
    pointerEvents: 'none',
  },
});
