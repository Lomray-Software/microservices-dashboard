let isChecked: boolean;

/**
 * Check if browser support webp
 */
export default function canUseWebP(): boolean {
  if ('undefined' !== typeof isChecked) {
    return isChecked;
  }

  if ('object' !== typeof document) {
    return false;
  }

  const canvas = document.createElement('canvas');

  if (!canvas.getContext || !canvas.getContext('2d')) {
    return (isChecked = false);
  }

  return (isChecked = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0);
}
