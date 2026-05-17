const DB_ID = '53df97c4-6db2-4c70-a39b-3e7064fb7cf2';

document.addEventListener('DOMContentLoaded', () => {
    updateCount();

    const form = document.getElementById('waitlist-form');
    const feedback = document.getElementById('form-feedback');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                levis_size: formData.get('levis_size'),
                preferred_fit: formData.get('preferred_fit')
            };

            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Transmitting...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(`https://app.baget.ai/api/public/databases/${DB_ID}/rows`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data })
                });

                if (response.ok) {
                    feedback.innerText = 'SUCCESS. You are on the list. Welcome to the mill.';
                    feedback.classList.remove('hidden', 'text-red-600');
                    feedback.classList.add('text-green-600');
                    form.reset();
                    updateCount();
                } else {
                    throw new Error('Transmission failed.');
                }
            } catch (err) {
                feedback.innerText = 'ERROR. Something went wrong. Try again.';
                feedback.classList.remove('hidden', 'text-green-600');
                feedback.classList.add('text-red-600');
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

async function updateCount() {
    const countEl = document.getElementById('waitlist-count');
    if (!countEl) return;

    try {
        const response = await fetch(`https://app.baget.ai/api/public/databases/${DB_ID}/count`);
        if (response.ok) {
            const { count } = await response.json();
            // Start with a floor of 127 to show some traction
            countEl.innerText = 127 + count;
        }
    } catch (err) {
        countEl.innerText = '127+';
    }
}