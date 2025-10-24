const regions = [
  "National Capital Region (NCR)",
  "Cordillera Administrative Region (CAR)",
  "Region I – Ilocos Region",
  "Region II – Cagayan Valley",
  "Region III – Central Luzon",
  "Region IV-A – CALABARZON",
  "MIMAROPA Region",
  "Region V – Bicol Region",
  "Region VI – Western Visayas",
  "Region VII – Central Visayas",
  "Region VIII – Eastern Visayas",
  "Region IX – Zamboanga Peninsula",
  "Region X – Northern Mindanao",
  "Region XI – Davao Region",
  "Region XII – SOCCSKSARGEN",
  "Region XIII – Caraga",
  "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)"
];

const wrapper = document.querySelector('.custom-select-wrapper');
const input = document.getElementById('tesda_region');

// Create dropdown
const dropdown = document.createElement('ul');
dropdown.classList.add('custom-dropdown');
wrapper.appendChild(dropdown);

// Populate dropdown
function updateDropdown(filter = '') {
  dropdown.innerHTML = '';
  regions.forEach(region => {
    if (region.toLowerCase().includes(filter.toLowerCase())) {
      const li = document.createElement('li');
      li.textContent = region;
      li.addEventListener('click', () => {
        input.value = region;
        dropdown.style.display = 'none';
      });
      dropdown.appendChild(li);
    }
  });
  dropdown.style.display = dropdown.children.length ? 'block' : 'none';
}

// Show all on focus
input.addEventListener('focus', () => updateDropdown());

// Filter as you type
input.addEventListener('input', () => updateDropdown(input.value));

// Hide dropdown on click outside
document.addEventListener('click', (e) => {
  if (!wrapper.contains(e.target)) dropdown.style.display = 'none';
});


