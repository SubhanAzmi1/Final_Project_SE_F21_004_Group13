<<<<<<< HEAD
const reportWebVitals = (onPerfEntry) => {
=======
const reportWebVitals = onPerfEntry => {
>>>>>>> d5e8b864cbfc89d4a8195b07cbe6caee1fa1090a
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
