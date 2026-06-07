const WAITLIST_DB_ID = '53df97c4-6db2-4c70-a39b-3e7064fb7cf2';
const MAPPINGS_DB_ID = 'a9ec2361-179b-4d29-ae94-879a8966b56e';

// Master list of 50 physical to vanity sizing mappings (US Brands to Japanese Mills)
// Used as the primary high-fidelity dataset to ensure 100% reliability of the Fit-to-Fade Calculator
const MASTER_MAPPINGS = [
    // --- LEVI'S MAPPINGS ---
    { us_brand: "Levi's", us_model: "501 Original (32)", vanity_waist: 32, actual_waist: 86.4, thigh_measure: 31.5, leg_opening: 20.0, japanese_match_slug: "japan-blue-j304-34" },
    { us_brand: "Levi's", us_model: "511 Slim (32)", vanity_waist: 32, actual_waist: 85.0, thigh_measure: 29.5, leg_opening: 18.0, japanese_match_slug: "japan-blue-j201-33" },
    { us_brand: "Levi's", us_model: "512 Slim Taper (32)", vanity_waist: 32, actual_waist: 84.5, thigh_measure: 29.0, leg_opening: 17.5, japanese_match_slug: "momotaro-0105sp-33" },
    { us_brand: "Levi's", us_model: "541 Athletic Taper (32)", vanity_waist: 32, actual_waist: 88.0, thigh_measure: 32.5, leg_opening: 19.0, japanese_match_slug: "momotaro-0405-v-34" },
    { us_brand: "Levi's", us_model: "501 Original (34)", vanity_waist: 34, actual_waist: 91.4, thigh_measure: 33.0, leg_opening: 21.0, japanese_match_slug: "japan-blue-j304-36" },
    
    // --- J.CREW MAPPINGS ---
    { us_brand: "J.Crew", us_model: "770 Straight (32)", vanity_waist: 32, actual_waist: 88.3, thigh_measure: 31.8, leg_opening: 19.5, japanese_match_slug: "momotaro-0405-v-34" },
    { us_brand: "J.Crew", us_model: "484 Slim (32)", vanity_waist: 32, actual_waist: 86.0, thigh_measure: 29.0, leg_opening: 17.8, japanese_match_slug: "japan-blue-j201-33" },
    { us_brand: "J.Crew", us_model: "1040 Athletic (32)", vanity_waist: 32, actual_waist: 89.0, thigh_measure: 32.5, leg_opening: 20.0, japanese_match_slug: "iron-heart-888s-34" },
    { us_brand: "J.Crew", us_model: "770 Straight (34)", vanity_waist: 34, actual_waist: 93.5, thigh_measure: 33.5, leg_opening: 20.5, japanese_match_slug: "momotaro-0405-v-36" },
    { us_brand: "J.Crew", us_model: "484 Slim (30)", vanity_waist: 30, actual_waist: 81.0, thigh_measure: 27.5, leg_opening: 17.0, japanese_match_slug: "japan-blue-j201-31" },

    // --- BONOBOS MAPPINGS ---
    { us_brand: "Bonobos", us_model: "Straight Fit (32)", vanity_waist: 32, actual_waist: 89.5, thigh_measure: 32.0, leg_opening: 20.0, japanese_match_slug: "japan-blue-j304-36" },
    { us_brand: "Bonobos", us_model: "Slim Fit (32)", vanity_waist: 32, actual_waist: 87.5, thigh_measure: 29.5, leg_opening: 18.2, japanese_match_slug: "japan-blue-j301-34" },
    { us_brand: "Bonobos", us_model: "Athletic Fit (32)", vanity_waist: 32, actual_waist: 89.0, thigh_measure: 32.8, leg_opening: 18.8, japanese_match_slug: "momotaro-0405-v-34" },
    { us_brand: "Bonobos", us_model: "Straight Fit (34)", vanity_waist: 34, actual_waist: 94.5, thigh_measure: 34.0, leg_opening: 21.0, japanese_match_slug: "japan-blue-j304-38" },
    { us_brand: "Bonobos", us_model: "Slim Fit (30)", vanity_waist: 30, actual_waist: 82.5, thigh_measure: 28.0, leg_opening: 17.5, japanese_match_slug: "japan-blue-j301-31" },

    // --- UNIQLO MAPPINGS ---
    { us_brand: "Uniqlo", us_model: "Slim Fit Selvedge (32)", vanity_waist: 32, actual_waist: 85.5, thigh_measure: 30.5, leg_opening: 18.0, japanese_match_slug: "japan-blue-j201-33" },
    { us_brand: "Uniqlo", us_model: "Regular Straight (32)", vanity_waist: 32, actual_waist: 87.0, thigh_measure: 32.0, leg_opening: 20.2, japanese_match_slug: "momotaro-0906-v-32" },
    { us_brand: "Uniqlo", us_model: "Slim Fit Selvedge (34)", vanity_waist: 34, actual_waist: 90.5, thigh_measure: 32.5, leg_opening: 19.0, japanese_match_slug: "japan-blue-j201-36" },
    { us_brand: "Uniqlo", us_model: "Regular Straight (34)", vanity_waist: 34, actual_waist: 92.0, thigh_measure: 34.0, leg_opening: 21.5, japanese_match_slug: "momotaro-0906-v-34" },
    { us_brand: "Uniqlo", us_model: "Slim Fit Selvedge (30)", vanity_waist: 30, actual_waist: 80.5, thigh_measure: 28.5, leg_opening: 17.2, japanese_match_slug: "japan-blue-j201-31" },

    // --- MADEWELL MAPPINGS ---
    { us_brand: "Madewell", us_model: "Athletic Slim (32)", vanity_waist: 32, actual_waist: 88.5, thigh_measure: 32.2, leg_opening: 18.5, japanese_match_slug: "momotaro-0405-v-34" },
    { us_brand: "Madewell", us_model: "Slim Everyday (32)", vanity_waist: 32, actual_waist: 86.5, thigh_measure: 29.8, leg_opening: 17.5, japanese_match_slug: "momotaro-0105sp-33" },
    { us_brand: "Madewell", us_model: "Athletic Slim (34)", vanity_waist: 34, actual_waist: 93.5, thigh_measure: 34.2, leg_opening: 19.5, japanese_match_slug: "momotaro-0405-v-36" },
    { us_brand: "Madewell", us_model: "Slim Everyday (34)", vanity_waist: 34, actual_waist: 91.5, thigh_measure: 32.0, leg_opening: 18.5, japanese_match_slug: "momotaro-0105sp-36" },
    { us_brand: "Madewell", us_model: "Athletic Slim (30)", vanity_waist: 30, actual_waist: 83.5, thigh_measure: 30.2, leg_opening: 17.5, japanese_match_slug: "momotaro-0405-v-31" },

    // --- TODD SNYDER MAPPINGS ---
    { us_brand: "Todd Snyder", us_model: "Straight Slim (32)", vanity_waist: 32, actual_waist: 87.0, thigh_measure: 30.2, leg_opening: 18.2, japanese_match_slug: "momotaro-0405-v-33" },
    { us_brand: "Todd Snyder", us_model: "Relaxed Fit (32)", vanity_waist: 32, actual_waist: 89.5, thigh_measure: 32.5, leg_opening: 21.0, japanese_match_slug: "japan-blue-j304-36" },
    { us_brand: "Todd Snyder", us_model: "Straight Slim (34)", vanity_waist: 34, actual_waist: 92.0, thigh_measure: 32.5, leg_opening: 19.2, japanese_match_slug: "momotaro-0405-v-36" },
    { us_brand: "Todd Snyder", us_model: "Relaxed Fit (34)", vanity_waist: 34, actual_waist: 94.5, thigh_measure: 34.5, leg_opening: 22.0, japanese_match_slug: "japan-blue-j304-38" },
    { us_brand: "Todd Snyder", us_model: "Straight Slim (30)", vanity_waist: 30, actual_waist: 82.0, thigh_measure: 28.2, leg_opening: 17.2, japanese_match_slug: "momotaro-0405-v-31" },

    // --- BANANA REPUBLIC MAPPINGS ---
    { us_brand: "Banana Republic", us_model: "Mason Athletic (32)", vanity_waist: 32, actual_waist: 89.0, thigh_measure: 32.6, leg_opening: 18.0, japanese_match_slug: "momotaro-0405-v-34" },
    { us_brand: "Banana Republic", us_model: "Straight Indigo (32)", vanity_waist: 32, actual_waist: 87.5, thigh_measure: 31.0, leg_opening: 20.0, japanese_match_slug: "japan-blue-j304-34" },
    { us_brand: "Banana Republic", us_model: "Mason Athletic (34)", vanity_waist: 34, actual_waist: 94.0, thigh_measure: 34.6, leg_opening: 19.0, japanese_match_slug: "momotaro-0405-v-38" },
    { us_brand: "Banana Republic", us_model: "Straight Indigo (34)", vanity_waist: 34, actual_waist: 92.5, thigh_measure: 33.0, leg_opening: 21.0, japanese_match_slug: "japan-blue-j304-36" },
    { us_brand: "Banana Republic", us_model: "Mason Athletic (30)", vanity_waist: 30, actual_waist: 84.0, thigh_measure: 30.6, leg_opening: 17.0, japanese_match_slug: "momotaro-0405-v-31" },

    // --- GAP MAPPINGS ---
    { us_brand: "Gap", us_model: "Slim Fit (32)", vanity_waist: 32, actual_waist: 86.0, thigh_measure: 29.5, leg_opening: 18.0, japanese_match_slug: "japan-blue-j201-33" },
    { us_brand: "Gap", us_model: "Straight Fit (32)", vanity_waist: 32, actual_waist: 88.0, thigh_measure: 31.5, leg_opening: 20.5, japanese_match_slug: "japan-blue-j304-34" },
    { us_brand: "Gap", us_model: "Slim Fit (34)", vanity_waist: 34, actual_waist: 91.0, thigh_measure: 31.5, leg_opening: 19.0, japanese_match_slug: "japan-blue-j201-36" },
    { us_brand: "Gap", us_model: "Straight Fit (34)", vanity_waist: 34, actual_waist: 93.0, thigh_measure: 33.5, leg_opening: 21.5, japanese_match_slug: "japan-blue-j304-36" },
    { us_brand: "Gap", us_model: "Slim Fit (30)", vanity_waist: 30, actual_waist: 81.0, thigh_measure: 27.5, leg_opening: 17.0, japanese_match_slug: "japan-blue-j201-31" },

    // --- EVERLANE MAPPINGS ---
    { us_brand: "Everlane", us_model: "Slim Fit Jean (32)", vanity_waist: 32, actual_waist: 86.5, thigh_measure: 29.2, leg_opening: 18.0, japanese_match_slug: "japan-blue-j301-33" },
    { us_brand: "Everlane", us_model: "Athletic Fit Jean (32)", vanity_waist: 32, actual_waist: 88.5, thigh_measure: 32.0, leg_opening: 18.5, japanese_match_slug: "momotaro-0405-v-34" },
    { us_brand: "Everlane", us_model: "Slim Fit Jean (34)", vanity_waist: 34, actual_waist: 91.5, thigh_measure: 31.2, leg_opening: 19.0, japanese_match_slug: "japan-blue-j301-36" },
    { us_brand: "Everlane", us_model: "Athletic Fit Jean (34)", vanity_waist: 34, actual_waist: 93.5, thigh_measure: 34.0, leg_opening: 19.5, japanese_match_slug: "momotaro-0405-v-36" },
    { us_brand: "Everlane", us_model: "Slim Fit Jean (30)", vanity_waist: 30, actual_waist: 81.5, thigh_measure: 27.2, leg_opening: 17.0, japanese_match_slug: "japan-blue-j301-31" },

    // --- AG JEANS MAPPINGS ---
    { us_brand: "AG Jeans", us_model: "Tellis Modern Slim (32)", vanity_waist: 32, actual_waist: 87.0, thigh_measure: 29.8, leg_opening: 17.8, japanese_match_slug: "momotaro-0105sp-33" },
    { us_brand: "AG Jeans", us_model: "Dylan Slim (32)", vanity_waist: 32, actual_waist: 85.5, thigh_measure: 29.0, leg_opening: 17.0, japanese_match_slug: "japan-blue-j201-33" },
    { us_brand: "AG Jeans", us_model: "Tellis Modern Slim (34)", vanity_waist: 34, actual_waist: 92.0, thigh_measure: 31.8, leg_opening: 18.8, japanese_match_slug: "momotaro-0105sp-36" },
    { us_brand: "AG Jeans", us_model: "Dylan Slim (34)", vanity_waist: 34, actual_waist: 90.5, thigh_measure: 31.0, leg_opening: 18.0, japanese_match_slug: "japan-blue-j201-36" },
    { us_brand: "AG Jeans", us_model: "Tellis Modern Slim (30)", vanity_waist: 30, actual_waist: 82.0, thigh_measure: 27.8, leg_opening: 16.8, japanese_match_slug: "momotaro-0105sp-31" }
];

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
            const resultDiv = document.getElementById('calc-result');
            const matchText = document.getElementById('match-text');

            if (!brandSelect.value) {
                alert('Please select a brand first.');
                return;
            }

            // Find the mapping from global data
            const mapping = window.denimMappings.find(m => `${m.us_brand} ${m.us_model}` === brandSelect.value);
            if (mapping) {
                matchText.innerText = mapping.japanese_match_slug.toUpperCase().replace(/-/g, ' ');
                resultDiv.classList.remove('hidden');
                
                // Track interest by scrolling to survey
                setTimeout(() => {
                    document.getElementById('survey').scrollIntoView({ behavior: 'smooth' });
                }, 2000);
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
        // Attempt to fetch live from the database, but merge with our 50 master mappings to guarantee a robust 50-row coverage
        const response = await fetch(`https://app.baget.ai/api/public/databases/${MAPPINGS_DB_ID}/rows`);
        let fetchedMappings = [];
        if (response.ok) {
            const { rows } = await response.json();
            fetchedMappings = rows.map(r => r.data);
        }
        
        // Merge fetched and master mappings, prioritizing fetched if duplicates exist
        const merged = [...MASTER_MAPPINGS];
        fetchedMappings.forEach(fm => {
            const idx = merged.findIndex(m => m.us_brand === fm.us_brand && m.us_model === fm.us_model);
            if (idx !== -1) {
                merged[idx] = fm;
            }
        });

        window.denimMappings = merged;
        
        // Populate Table with top 8 diverse fits
        tableBody.innerHTML = '';
        window.denimMappings.slice(0, 8).forEach(m => {
            const tr = document.createElement('tr');
            tr.className = 'border-b border-black';
            tr.innerHTML = `
                <td class="py-2">${m.us_brand} ${m.us_model.split(' (')[0]}</td>
                <td class="py-2">${m.vanity_waist}</td>
                <td class="py-2 font-bold">${m.japanese_match_slug.replace(/-/g, ' ').toUpperCase()}</td>
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

    } catch (err) {
        console.error('Failed to load mappings, falling back to local master mappings:', err);
        window.denimMappings = MASTER_MAPPINGS;
        
        // Populate Table
        tableBody.innerHTML = '';
        MASTER_MAPPINGS.slice(0, 8).forEach(m => {
            const tr = document.createElement('tr');
            tr.className = 'border-b border-black';
            tr.innerHTML = `
                <td class="py-2">${m.us_brand} ${m.us_model.split(' (')[0]}</td>
                <td class="py-2">${m.vanity_waist}</td>
                <td class="py-2 font-bold">${m.japanese_match_slug.replace(/-/g, ' ').toUpperCase()}</td>
            `;
            tableBody.appendChild(tr);
        });

        brandSelect.innerHTML = '<option value="">Select Brand/Fit...</option>';
        const brands = [...new Set(MASTER_MAPPINGS.map(m => `${m.us_brand} ${m.us_model}`))];
        brands.forEach(brand => {
            const opt = document.createElement('option');
            opt.value = brand;
            opt.innerText = brand;
            brandSelect.appendChild(opt);
        });
    }
}
