import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const spinerStart = () => {
  Loading.hourglass('Wait please...', {
    svgColor: 'var(--blue-cl)',
    svgSize: '50px',
  });
};

export const spinerStop = () => {
  Loading.remove();
};
