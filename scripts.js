const tallyContainer = document.querySelector('.tally-widget-container');

if (tallyContainer) {
  const script = document.createElement('script');
  script.src = 'https://tally.so/widgets/embed.js';
  script.async = true;
  document.body.appendChild(script);
}
