export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    return 'mobile';
  } else if (screenWidth >= 768 && screenWidth <= 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

export const getSizePageByDevice = (): number => {
  const device = getDeviceType();
  return device === 'desktop' ? 10 : device === 'tablet' ? 6 : 1;
};
