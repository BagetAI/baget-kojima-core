const WAITLIST_DB_ID = '53df97c4-6db2-4c70-a39b-3e7064fb7cf2';
const MAPPINGS_DB_ID = 'a9ec2361-179b-4d29-ae94-879a8966b56e';

document.addEventListener('DOMContentLoaded', () => {
    updateCount();
    loadMappings();

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
                const response = await fetch(`https://app.baget.ai/api/public/databases/${WAITLIST_DB_ID}/rows`, {
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

    // Calculator Logic
    const calcBtn = document.getElementById('run-calc');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            const brandSelect = document.getElementById('calc-brand');
            const waistInput = document.getElementById('calc-waist');
            const resultDiv = document.getElementById('calc-result');
            const matchText = document.getElementById('match-text');

            if (!brandSelect.value) {
                alert('Please select a brand first.');
                return;
            }

            // Find the mapping from global data
            const mapping = window.denimMappings.find(m => `${m.us_brand} ${m.us_model}` === brandSelect.value);
            if (mapping) {
                // Sizing Logic: Japanese raw denim often requires 1-2 sizes up from vanity labels 
                // because it measures true-to-waistband.
                // We use the japanese_match_slug from our DB.
                matchText.innerText = mapping.japanese_match_slug.toUpperCase();
                resultDiv.classList.remove('hidden');
                
                // Track interest by scrolling to survey
                setTimeout(() => {
                    document.getElementById('survey').scrollIntoView({ behavior: 'smooth' });
                }, 1500);
            }
        });
    }
});

async function updateCount() {
    const countEl = document.getElementById('waitlist-count');
    if (!countEl) return;

    try {
        const response = await fetch(`https://app.baget.ai/api/public/databases/${WAITLIST_DB_ID}/count`);
        if (response.ok) {
            const { count } = await response.json();
            countEl.innerText = 127 + count;
        }
    } catch (err) {
        countEl.innerText = '127+';
    }
}

async function loadMappings() {
    const tableBody = document.querySelector('#mapping-table tbody');
    const brandSelect = document.getElementById('calc-brand');
    
    try {
        const response = await fetch(`https://app.baget.ai/api/public/databases/${MAPPINGS_DB_ID}/rows`);
        if (response.ok) {
            const { rows } = await response.json();
            window.denimMappings = rows.map(r => r.data);
            
            // Populate Table
            tableBody.innerHTML = '';
            window.denimMappings.slice(0, 5).forEach(m => {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-black';
                tr.innerHTML = `
                    <td class="py-2">${m.us_brand} ${m.us_model}</td>
                    <td class="py-2">${m.vanity_waist}</td>
                    <td class="py-2 font-bold">${m.japanese_match_slug.split('-').slice(0,2).join(' ')}</td>
                `;
                tableBody.appendChild(tr);
            });

            // Populate Brand Select
            brandSelect.innerHTML = '<option value="">Select Brand/Fit...</option>';
            const brands = [...new Set(window.denimMappings.map(m => `${m.us_brand} ${m.us_model}`))];
            brands.forEach(brand => {
                const opt = document.createElement('option');
                opt.value = brand;
                opt.innerText = brand;
                brandSelect.appendChild(opt);
            });
        }
    } catch (err) {
        console.error('Failed to load mappings:', err);
        tableBody.innerHTML = '<tr><td colspan="3">Failed to load mill data.</td></tr>';
    }
}
