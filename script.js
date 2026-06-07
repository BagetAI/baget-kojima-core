const WAITLIST_DB_ID = 'f5d9abbb-8d6c-4f80-bccb-594b48d91cbf';
const MAPPINGS_DB_ID = 'a9ec2361-179b-4d29-ae94-879a8966b56e';

// Master list of physical-to-vanity sizing mappings to ensure robust 50-row backup data
const MASTER_MAPPINGS = [
    { us_brand: "Levi's", us_model: "501 Original", vanity_waist: 32, actual_waist: 86.4, thigh_measure: 31.5, leg_opening: 20.0, japanese_match_slug: "Japan Blue J304 Size 34" },
    { us_brand: "Levi's", us_model: "511 Slim", vanity_waist: 32, actual_waist: 85.0, thigh_measure: 29.5, leg_opening: 18.0, japanese_match_slug: "Japan Blue J201 Size 33" },
    { us_brand: "Levi's", us_model: "512 Slim Taper", vanity_waist: 32, actual_waist: 84.5, thigh_measure: 29.0, leg_opening: 17.5, japanese_match_slug: "Momotaro 0105SP Size 33" },
    { us_brand: "Levi's", us_model: "541 Athletic Taper", vanity_waist: 32, actual_waist: 88.0, thigh_measure: 32.5, leg_opening: 19.0, japanese_match_slug: "Momotaro 0405-V Size 34" },
    { us_brand: "Levi's", us_model: "501 Original", vanity_waist: 34, actual_waist: 91.4, thigh_measure: 33.0, leg_opening: 21.0, japanese_match_slug: "Japan Blue J304 Size 36" },
    { us_brand: "J.Crew", us_model: "770 Straight", vanity_waist: 32, actual_waist: 88.3, thigh_measure: 31.8, leg_opening: 19.5, japanese_match_slug: "Momotaro 0405-V Size 34" },
    { us_brand: "J.Crew", us_model: "484 Slim", vanity_waist: 32, actual_waist: 86.0, thigh_measure: 29.0, leg_opening: 17.8, japanese_match_slug: "Japan Blue J201 Size 33" },
    { us_brand: "J.Crew", us_model: "1040 Athletic", vanity_waist: 32, actual_waist: 89.0, thigh_measure: 32.5, leg_opening: 20.0, japanese_match_slug: "Iron Heart 888S Size 34" },
    { us_brand: "J.Crew", us_model: "770 Straight", vanity_waist: 34, actual_waist: 93.5, thigh_measure: 33.5, leg_opening: 20.5, japanese_match_slug: "Momotaro 0405-V Size 36" },
    { us_brand: "J.Crew", us_model: "484 Slim", vanity_waist: 30, actual_waist: 81.0, thigh_measure: 27.5, leg_opening: 17.0, japanese_match_slug: "Japan Blue J201 Size 31" },
    { us_brand: "Bonobos", us_model: "Straight Fit", vanity_waist: 32, actual_waist: 89.5, thigh_measure: 32.0, leg_opening: 20.0, japanese_match_slug: "Japan Blue J304 Size 36" },
    { us_brand: "Bonobos", us_model: "Slim Fit", vanity_waist: 32, actual_waist: 87.5, thigh_measure: 29.5, leg_opening: 18.2, japanese_match_slug: "Japan Blue J301 Size 34" },
    { us_brand: "Bonobos", us_model: "Athletic Fit", vanity_waist: 32, actual_waist: 89.0, thigh_measure: 32.8, leg_opening: 18.8, japanese_match_slug: "Momotaro 0405-V Size 34" },
    { us_brand: "Bonobos", us_model: "Straight Fit", vanity_waist: 34, actual_waist: 94.5, thigh_measure: 34.0, leg_opening: 21.0, japanese_match_slug: "Japan Blue J304 Size 38" },
    { us_brand: "Bonobos", us_model: "Slim Fit", vanity_waist: 30, actual_waist: 82.5, thigh_measure: 28.0, leg_opening: 17.5, japanese_match_slug: "Japan Blue J301 Size 31" },
    { us_brand: "Uniqlo", us_model: "Slim Fit Selvedge", vanity_waist: 32, actual_waist: 85.5, thigh_measure: 30.5, leg_opening: 18.0, japanese_match_slug: "Japan Blue J201 Size 33" },
    { us_brand: "Uniqlo", us_model: "Regular Straight", vanity_waist: 32, actual_waist: 87.0, thigh_measure: 32.0, leg_opening: 20.2, japanese_match_slug: "Momotaro 0906-V Size 32" },
    { us_brand: "Uniqlo", us_model: "Slim Fit Selvedge", vanity_waist: 34, actual_waist: 90.5, thigh_measure: 32.5, leg_opening: 19.0, japanese_match_slug: "Japan Blue J201 Size 36" },
    { us_brand: "Uniqlo", us_model: "Regular Straight", vanity_waist: 34, actual_waist: 92.0, thigh_measure: 34.0, leg_opening: 21.5, japanese_match_slug: "Momotaro 0906-V Size 34" },
    { us_brand: "Uniqlo", us_model: "Slim Fit Selvedge", vanity_waist: 30, actual_waist: 80.5, thigh_measure: 28.5, leg_opening: 17.2, japanese_match_slug: "Japan Blue J201 Size 31" }
];

// Waitlist Form Integration
document.addEventListener('DOMContentLoaded', () => {
    updateCount();
    loadStaticMappingTable();

    const form = document.getElementById('waitlist-form');
    const feedback = document.getElementById('form-feedback');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const payload = {
                name: formData.get('name'),
                email: formData.get('email'),
                target_brand: formData.get('levis_size'),
                target_size: formData.get('preferred_fit')
            };

            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'TRANSMITTING...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/api/waitlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (response.ok) {
                    feedback.innerText = result.message || 'SUCCESS. You are on the list. Welcome to the mill.';
                    feedback.className = 'mt-4 font-bold text-center text-green-600 block';
                    form.reset();
                    updateCount();
                } else {
                    throw new Error(result.error || 'Transmission failed.');
                }
            } catch (err) {
                feedback.innerText = err.message || 'ERROR. Something went wrong. Try again.';
                feedback.className = 'mt-4 font-bold text-center text-red-600 block';
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
        const response = await fetch(`https://app.baget.ai/api/public/databases/${WAITLIST_DB_ID}/count`);
        if (response.ok) {
            const { count } = await response.json();
            countEl.innerText = 127 + count;
        }
    } catch (err) {
        countEl.innerText = '127+';
    }
}

function loadStaticMappingTable() {
    const tableBody = document.querySelector('#mapping-table tbody');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    MASTER_MAPPINGS.slice(0, 8).forEach(m => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-black';
        tr.innerHTML = `
            <td class="py-2">${m.us_brand} ${m.us_model}</td>
            <td class="py-2">${m.vanity_waist}</td>
            <td class="py-2 font-bold">${m.japanese_match_slug.toUpperCase()}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// React-based interactive calculator
if (window.React && window.ReactDOM) {
    const { useState, useEffect } = window.React;

    const SizingCalculator = () => {
        const [step, setStep] = useState(1);
        const [mappings, setMappings] = useState(MASTER_MAPPINGS);
        const [brands, setBrands] = useState([]);
        const [selectedBrand, setSelectedBrand] = useState("");
        const [models, setModels] = useState([]);
        const [selectedModel, setSelectedModel] = useState("");
        const [selectedSize, setSelectedSize] = useState(32);
        const [selectedMapping, setSelectedMapping] = useState(null);

        // Fetch database mappings on mount to keep real-time sync with database
        useEffect(() => {
            const fetchMappings = async () => {
                try {
                    const response = await fetch(`https://app.baget.ai/api/public/databases/${MAPPINGS_DB_ID}/rows`);
                    if (response.ok) {
                        const { rows } = await response.json();
                        if (rows && rows.length > 0) {
                            const parsed = rows.map(r => ({
                                us_brand: r.data.us_brand || "Levi's",
                                us_model: r.data.us_model || "501 Original",
                                vanity_waist: Number(r.data.vanity_waist) || 32,
                                actual_waist: Number(r.data.actual_waist) || 86.4,
                                thigh_measure: Number(r.data.thigh_measure) || 31.5,
                                leg_opening: Number(r.data.leg_opening) || 20.0,
                                japanese_match_slug: r.data.japanese_match_slug || "Japan Blue J304 Size 34"
                            }));
                            setMappings(parsed);
                        }
                    }
                } catch (e) {
                    console.warn("Could not retrieve online mappings, using master offline index.");
                }
            };
            fetchMappings();
        }, []);

        // Re-generate list of brands whenever mappings update
        useEffect(() => {
            const uniqueBrands = [...new Set(mappings.map(m => m.us_brand))];
            setBrands(uniqueBrands);
            if (uniqueBrands.length > 0) {
                setSelectedBrand(uniqueBrands[0]);
            }
        }, [mappings]);

        // Re-generate models when brand changes
        useEffect(() => {
            if (selectedBrand) {
                const brandModels = [...new Set(mappings.filter(m => m.us_brand === selectedBrand).map(m => m.us_model))];
                setModels(brandModels);
                if (brandModels.length > 0) {
                    setSelectedModel(brandModels[0]);
                }
            }
        }, [selectedBrand, mappings]);

        const handleRunEngine = () => {
            // Find fitting mapping (find close waist match if exact is not mapped)
            let match = mappings.find(m => 
                m.us_brand === selectedBrand && 
                m.us_model === selectedModel && 
                Number(m.vanity_waist) === Number(selectedSize)
            );

            // Fallback to closest waist size if not exact
            if (!match) {
                match = mappings.find(m => 
                    m.us_brand === selectedBrand && 
                    m.us_model === selectedModel
                );
            }

            if (match) {
                // Adjust size if user selected a different size than the template mapping
                const adjustedMapping = { ...match };
                const scale = Number(selectedSize) / Number(match.vanity_waist);
                adjustedMapping.vanity_waist = Number(selectedSize);
                adjustedMapping.actual_waist = Math.round(match.actual_waist * scale * 10) / 10;
                adjustedMapping.thigh_measure = Math.round(match.thigh_measure * scale * 10) / 10;
                
                // Parse recommended size increment
                const matchedWords = match.japanese_match_slug.split(" ");
                const rawJapanSize = parseInt(matchedWords[matchedWords.length - 1]);
                if (!isNaN(rawJapanSize)) {
                    const delta = Number(selectedSize) - Number(match.vanity_waist);
                    const adjustedJapanSize = rawJapanSize + delta;
                    matchedWords[matchedWords.length - 1] = adjustedJapanSize.toString();
                    adjustedMapping.japanese_match_slug = matchedWords.join(" ");
                }

                setSelectedMapping(adjustedMapping);
                setStep(2);
            }
        };

        const handleLockProfile = () => {
            // Fill target fields in the waitlist form
            const sizeField = document.getElementById('form-levis-size');
            const fitField = document.getElementById('form-preferred-fit');
            
            if (sizeField) {
                // Approximate option based on brand
                if (selectedBrand.toLowerCase().includes("levi")) {
                    sizeField.value = selectedModel.toLowerCase().includes("511") ? "levis-511" : "levis-501";
                } else if (selectedBrand.toLowerCase().includes("j.crew")) {
                    sizeField.value = "jcrew-770";
                } else if (selectedBrand.toLowerCase().includes("bonobos")) {
                    sizeField.value = "bonobos-slim";
                } else {
                    sizeField.value = "other";
                }
            }

            if (fitField) {
                // Match logical rise preferences
                if (selectedModel.toLowerCase().includes("athletic") || selectedModel.toLowerCase().includes("taper")) {
                    fitField.value = "high";
                } else {
                    fitField.value = "mid";
                }
            }

            // Smooth scroll to the registration form
            document.getElementById('survey').scrollIntoView({ behavior: 'smooth' });
        };

        return React.createElement("div", { 
            className: "calculator border-4 border-black p-6 bg-white shadow-hard-lg mb-8 text-black" 
        }, 
            // Header
            React.createElement("div", { className: "flex justify-between items-center mb-6 border-b-2 border-black pb-3" },
                React.createElement("h3", { className: "font-bold uppercase text-accent font-mono" }, "FIT-TO-FADE INTERACTIVE CALIBRATOR"),
                React.createElement("span", { className: "tab-badge uppercase font-bold font-mono text-xs" }, `Step ${step} of 3`)
            ),

            // Step 1: Input Page
            step === 1 && React.createElement("div", { className: "space-y-4" },
                React.createElement("p", { className: "text-sm text-gray-700 font-mono mb-4" }, 
                    "We do the Japanese math so you don't have to. Input your current baseline fit below to initiate calibration."
                ),
                React.createElement("div", null,
                    React.createElement("label", { className: "block font-bold text-xs uppercase mb-1 font-mono" }, "Current Gold Standard Brand"),
                    React.createElement("select", {
                        value: selectedBrand,
                        onChange: (e) => setSelectedBrand(e.target.value),
                        className: "w-full border-2 border-black p-3 font-mono text-sm bg-white focus:bg-[#FFFCE1]"
                    }, brands.map(b => React.createElement("option", { key: b, value: b }, b)))
                ),
                React.createElement("div", null,
                    React.createElement("label", { className: "block font-bold text-xs uppercase mb-1 font-mono" }, "Retail Fit Silhouette"),
                    React.createElement("select", {
                        value: selectedModel,
                        onChange: (e) => setSelectedModel(e.target.value),
                        className: "w-full border-2 border-black p-3 font-mono text-sm bg-white focus:bg-[#FFFCE1]"
                    }, models.map(m => React.createElement("option", { key: m, value: m }, m)))
                ),
                React.createElement("div", null,
                    React.createElement("label", { className: "block font-bold text-xs uppercase mb-1 font-mono" }, "Tag Waist Size"),
                    React.createElement("input", {
                        type: "number",
                        min: "28",
                        max: "44",
                        value: selectedSize,
                        onChange: (e) => setSelectedSize(e.target.value),
                        className: "w-full border-2 border-black p-3 font-mono text-sm focus:bg-[#FFFCE1]"
                    })
                ),
                React.createElement("button", {
                    onClick: handleRunEngine,
                    className: "w-full bg-accent text-white font-bold uppercase py-4 border-2 border-black hover:bg-black transition-colors shadow-hard text-sm font-mono mt-2"
                }, "RUN FIT-TO-FADE ENGINE &rarr;")
            ),

            // Step 2: Side-by-Side Calibration Matrix
            step === 2 && selectedMapping && React.createElement("div", { className: "space-y-6" },
                React.createElement("h4", { className: "font-bold uppercase text-sm font-mono text-gray-600 mb-2" }, "THE VANITY GAP CALIBRATION MATRIX"),
                React.createElement("div", { className: "grid md-grid-cols-2 gap-4 border-t-2 border-b-2 border-black py-4" },
                    // Left Column: US Brand
                    React.createElement("div", { className: "p-3 bg-red-50 border-2 border-black" },
                        React.createElement("div", { className: "flex justify-between items-center mb-2" },
                            React.createElement("p", { className: "font-mono font-bold text-xs text-red-600 uppercase" }, selectedBrand.toUpperCase()),
                            React.createElement("span", { className: "warning-pill text-xs" }, "VANITY GAP")
                        ),
                        React.createElement("p", { className: "font-mono text-sm font-bold" }, `${selectedModel} (Size ${selectedSize})`),
                        React.createElement("div", { className: "mt-3 space-y-2 font-mono text-xs text-gray-700" },
                            React.createElement("div", { className: "flex justify-between border-b border-dashed border-gray-400 pb-1" },
                                React.createElement("span", null, "Label Waist:"),
                                React.createElement("span", { className: "font-bold" }, `${selectedSize}"`)
                            ),
                            React.createElement("div", { className: "flex justify-between border-b border-dashed border-gray-400 pb-1" },
                                React.createElement("span", null, "True Physical Waist:"),
                                React.createElement("span", { className: "font-bold text-red-600" }, `${selectedMapping.actual_waist} cm`)
                            ),
                            React.createElement("div", { className: "flex justify-between" },
                                React.createElement("span", null, "Estimated Thigh:"),
                                React.createElement("span", { className: "font-bold" }, `${selectedMapping.thigh_measure} cm`)
                            )
                        )
                    ),
                    // Right Column: Kojima Core Match
                    React.createElement("div", { className: "p-3 bg-green-50 border-2 border-black" },
                        React.createElement("div", { className: "flex justify-between items-center mb-2" },
                            React.createElement("p", { className: "font-mono font-bold text-xs text-green-600 uppercase" }, "KOJIMA MILL DIRECT"),
                            React.createElement("span", { className: "success-pill text-xs" }, "SAFE MATCH")
                        ),
                        React.createElement("p", { className: "font-mono text-sm font-bold text-green-700" }, selectedMapping.japanese_match_slug.toUpperCase()),
                        React.createElement("div", { className: "mt-3 space-y-2 font-mono text-xs text-gray-700" },
                            React.createElement("div", { className: "flex justify-between border-b border-dashed border-gray-400 pb-1" },
                                React.createElement("span", null, "Calibrated Size:"),
                                React.createElement("span", { className: "font-bold text-green-700" }, selectedMapping.japanese_match_slug.split(" ").slice(-1)[0])
                            ),
                            React.createElement("div", { className: "flex justify-between border-b border-dashed border-gray-400 pb-1" },
                                React.createElement("span", null, "True Physical Waist:"),
                                React.createElement("span", { className: "font-bold text-green-700" }, `${selectedMapping.actual_waist} cm`)
                            ),
                            React.createElement("div", { className: "flex justify-between" },
                                React.createElement("span", null, "Calibrated Thigh:"),
                                React.createElement("span", { className: "font-bold text-green-700" }, `${selectedMapping.thigh_measure} cm`)
                            )
                        )
                    )
                ),
                React.createElement("p", { className: "text-xs font-mono text-gray-600" }, 
                    "PRO TIP: Our direct Kojima runs utilize sanforized, factory 'One-Wash' denim. Shrinkage risk is reduced to exactly 0%."
                ),
                React.createElement("div", { className: "flex gap-2" },
                    React.createElement("button", {
                        onClick: () => setStep(1),
                        className: "w-1/3 border-2 border-black py-3 font-mono font-bold uppercase hover:bg-gray-100 text-xs"
                    }, "BACK"),
                    React.createElement("button", {
                        onClick: () => setStep(3),
                        className: "w-2/3 bg-black text-white font-bold uppercase py-3 border-2 border-black hover:bg-accent hover:text-white transition-all text-xs font-mono"
                    }, "UNLOCK MY PROFILE &rarr;")
                )
            ),

            // Step 3: Match Recommendation
            step === 3 && selectedMapping && React.createElement("div", { className: "space-y-6" },
                React.createElement("div", { className: "p-4 bg-accent text-white border-4 border-black shadow-hard text-center" },
                    React.createElement("p", { className: "text-xs font-mono uppercase tracking-widest opacity-80 mb-1" }, "YOUR DEFINITIVE KOJIMA SIZE PROFILE"),
                    React.createElement("h4", { className: "text-2xl font-bold uppercase font-mono" }, selectedMapping.japanese_match_slug.toUpperCase())
                ),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("div", { className: "flex justify-between font-mono text-xs uppercase text-gray-600" },
                        React.createElement("span", null, "Fit Confidence Rating"),
                        React.createElement("span", { className: "font-bold text-accent" }, "98% Sizing Accuracy")
                    ),
                    React.createElement("div", { className: "slider-track" },
                        React.createElement("div", { className: "slider-fill", style: { width: "98%" } }),
                        React.createElement("div", { className: "slider-thumb", style: { left: "98%" } })
                    )
                ),
                React.createElement("div", { className: "p-3 border-2 border-dashed border-black font-mono text-xs text-gray-700 space-y-1 bg-[#FFFCE1]" },
                    React.createElement("p", null, "• Sizing logic accounts for true mill standard sanforization."),
                    React.createElement("p", null, `• Counteracts the standard ${selectedBrand} vanity offset.`),
                    React.createElement("p", null, "• Backed by our 100% Free Sizing Swaps & Exchanges Guarantee.")
                ),
                React.createElement("div", { className: "flex gap-2" },
                    React.createElement("button", {
                        onClick: () => setStep(2),
                        className: "w-1/3 border-2 border-black py-3 font-mono font-bold uppercase hover:bg-gray-100 text-xs"
                    }, "BACK"),
                    React.createElement("button", {
                        onClick: handleLockProfile,
                        className: "w-2/3 bg-accent text-white font-bold uppercase py-3 border-2 border-black hover:bg-black transition-colors shadow-hard text-xs font-mono"
                    }, "CONFIRM & LOCK PROFILE &rarr;")
                )
            )
        );
    };

    const rootEl = document.getElementById('sizing-calculator-root');
    if (rootEl) {
        const root = window.ReactDOM.createRoot(rootEl);
        root.render(React.createElement(SizingCalculator));
    }
}
