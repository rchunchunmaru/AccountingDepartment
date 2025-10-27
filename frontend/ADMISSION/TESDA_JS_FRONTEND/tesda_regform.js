document.addEventListener('DOMContentLoaded', function() {
    const applicationTypeSelect = document.getElementById('tesda_application_type');
    const trainingSection = document.getElementById('Tesda_Training');
    const assessmentSection = document.getElementById('Tesda_Assesment');

    // Utility function to toggle required attributes
    function toggleRequired(section, enable) {
        const inputs = section.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (enable) {
                input.setAttribute('required', 'required');
            } else {
                input.removeAttribute('required');
            }
        });
    }

    applicationTypeSelect.addEventListener('change', function() {
        const selectedValue = applicationTypeSelect.value;

        if (selectedValue === 'training') {
            trainingSection.style.display = 'block';
            assessmentSection.style.display = 'none';

            toggleRequired(trainingSection, true);
            toggleRequired(assessmentSection, false);

        } else if (selectedValue === 'assessment') {
            assessmentSection.style.display = 'block';
            trainingSection.style.display = 'none';

            toggleRequired(assessmentSection, true);
            toggleRequired(trainingSection, false);

        } else {
            trainingSection.style.display = 'none';
            assessmentSection.style.display = 'none';

            toggleRequired(trainingSection, false);
            toggleRequired(assessmentSection, false);
        }
    });
});


document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent real submission
  // Do your own submission logic
});