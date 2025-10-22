document.addEventListener('DOMContentLoaded', function () {
  const applyForOptions = [
    { header: "BASIC EDUCATION", items: ["Nursery","Kinder","Preparatory"] }, 
    { header: "ELEMENTARY", items: ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"] }, 
    { header: "HIGH SCHOOL", items: ["Junior High School Grade 7", "Junior High School Grade 8","Junior High School Grade 9", "Junior High School Grade 10"]}, 
    { header: "SENIOR HIGH SCHOOL", items: ["Senior High School Grade 11", "Senior High School Grade 12"] },
    { header: "HIGHER EDUCATION", items: ["Freshmen (1st Year)","2nd year","3rd year","4th year"] }
  ];

  const applyWrapper = document.querySelector('.applyfor-wrapper');
  const applyInput = document.getElementById('mqcqc_applying_for');

  const applyDropdown = document.createElement('ul');
  applyDropdown.className = 'applyfor-dropdown';
  applyWrapper.appendChild(applyDropdown);

  let currentIndex = -1;

  function updateApplyDropdown(filter = '') {
    applyDropdown.innerHTML = '';
    currentIndex = -1;

    let hasResults = false;

    applyForOptions.forEach(group => {
      // Filter items inside each group
      const filteredItems = group.items.filter(option =>
        option.toLowerCase().includes(filter.toLowerCase())
      );

      if (filteredItems.length > 0) {
        hasResults = true;

        // Add group header
        const header = document.createElement('li');
        header.textContent = group.header;
        header.classList.add('dropdown-header');
        applyDropdown.appendChild(header);

        // Add items under this group
        filteredItems.forEach(option => {
          const li = document.createElement('li');
          li.textContent = option;
          li.addEventListener('mousedown', (e) => {
            e.preventDefault();
            applyInput.value = option;
            applyDropdown.style.display = 'none';
          });
          applyDropdown.appendChild(li);
        });
      }
    });

    applyDropdown.style.display = hasResults ? 'block' : 'none';
  }

  applyInput.addEventListener('focus', () => updateApplyDropdown(''));
  applyInput.addEventListener('input', () => updateApplyDropdown(applyInput.value));

  document.addEventListener('click', (e) => {
    if (!applyWrapper.contains(e.target)) applyDropdown.style.display = 'none';
  });
});
