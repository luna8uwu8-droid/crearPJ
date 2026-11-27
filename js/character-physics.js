const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const resolveCharacterCollision = (first, second) => {
  if (!first || !second || !first.isConnected || !second.isConnected) return false;

  const firstBox = first.getBoundingClientRect();
  const secondBox = second.getBoundingClientRect();
  const overlapX = Math.min(firstBox.right, secondBox.right) - Math.max(firstBox.left, secondBox.left);
  const overlapY = Math.min(firstBox.bottom, secondBox.bottom) - Math.max(firstBox.top, secondBox.top);
  if (overlapX <= 0 || overlapY <= 0) return false;

  const horizontal = overlapX <= overlapY;

  const place = (element, left, top) => {
    const maxLeft = Math.max(8, window.innerWidth - element.offsetWidth - 8);
    const maxTop = Math.max(8, window.innerHeight - element.offsetHeight - 8);
    element.style.left = `${clamp(left, 8, maxLeft)}px`;
    element.style.top = `${clamp(top, 8, maxTop)}px`;
    element.style.right = 'auto';
    element.style.bottom = 'auto';
  };

  const separate = (useHorizontal) => {
    const firstStart = useHorizontal ? firstBox.left : firstBox.top;
    const secondStart = useHorizontal ? secondBox.left : secondBox.top;
    const firstExtent = useHorizontal ? first.offsetWidth : first.offsetHeight;
    const secondExtent = useHorizontal ? second.offsetWidth : second.offsetHeight;
    const viewportExtent = useHorizontal ? window.innerWidth : window.innerHeight;
    const firstAxisCenter = useHorizontal
      ? firstBox.left + firstBox.width / 2
      : firstBox.top + firstBox.height / 2;
    const secondAxisCenter = useHorizontal
      ? secondBox.left + secondBox.width / 2
      : secondBox.top + secondBox.height / 2;
    const firstDirection = firstAxisCenter <= secondAxisCenter ? -1 : 1;
    const secondDirection = -firstDirection;
    const overlap = useHorizontal ? overlapX : overlapY;
    const firstCapacity = firstDirection < 0
      ? firstStart - 8
      : viewportExtent - firstExtent - 8 - firstStart;
    const secondCapacity = secondDirection < 0
      ? secondStart - 8
      : viewportExtent - secondExtent - 8 - secondStart;
    const required = overlap + 6;
    let firstMove = Math.min(required / 2, Math.max(0, firstCapacity));
    let secondMove = Math.min(required / 2, Math.max(0, secondCapacity));
    let remaining = required - firstMove - secondMove;
    const extraFirst = Math.min(remaining, Math.max(0, firstCapacity - firstMove));
    firstMove += extraFirst;
    remaining -= extraFirst;
    secondMove += Math.min(remaining, Math.max(0, secondCapacity - secondMove));
    if (firstMove + secondMove < required) return false;

    const firstNext = firstStart + firstDirection * firstMove;
    const secondNext = secondStart + secondDirection * secondMove;
    place(first, useHorizontal ? firstNext : firstBox.left, useHorizontal ? firstBox.top : firstNext);
    place(second, useHorizontal ? secondNext : secondBox.left, useHorizontal ? secondBox.top : secondNext);
    return true;
  };

  if (!separate(horizontal)) separate(!horizontal);
  return true;
};
