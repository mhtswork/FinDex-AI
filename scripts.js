const demoForm = document.getElementById('demo-form');
const formStatus = document.getElementById('form-status');
const storageKey = 'findex-demo-requests';
const tallyDemoUrl = 'https://tally.so/r/GxVr4O';

if (demoForm && formStatus) {
  const endpoint = demoForm.dataset.endpoint || '';

  demoForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(demoForm);
    const payload = Object.fromEntries(formData.entries());

    formStatus.textContent = 'Redirecting you to the demo request form...';
    formStatus.className = 'form-status is-loading';

    if (tallyDemoUrl) {
      window.location.href = tallyDemoUrl;
      return;
    }

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }

        formStatus.textContent = 'Thanks! Your request was received. We will follow up shortly.';
        formStatus.className = 'form-status success';
        demoForm.reset();
        return;
      }

      const storedRequests = JSON.parse(localStorage.getItem(storageKey) || '[]');
      storedRequests.push({
        ...payload,
        submittedAt: new Date().toISOString(),
      });

      localStorage.setItem(storageKey, JSON.stringify(storedRequests));

      formStatus.textContent = 'Thanks! Your request was saved locally for now. Connect Tally or a similar form tool to capture submissions in a shared sheet.';
      formStatus.className = 'form-status success';
      demoForm.reset();
    } catch (error) {
      console.error(error);
      formStatus.textContent = 'Something went wrong. Please try again in a moment.';
      formStatus.className = 'form-status error';
    }
  });
}
