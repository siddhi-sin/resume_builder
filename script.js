// Variables to track current state
let currentStep = 1;
let currentTab = 'personal';

// Select all tab buttons and content elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const steps = document.querySelectorAll('.step');

// Function to switch tabs
function switchTab(tabId) {
  // Update active tab button
  tabButtons.forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Update active tab content
  tabContents.forEach(content => {
    if (content.id === `${tabId}-tab`) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
  
  // Update current tab
  currentTab = tabId;
  
  // Update steps based on current tab
  switch (tabId) {
    case 'personal':
      currentStep = 1;
      break;
    case 'education':
      currentStep = 2;
      break;
    case 'experience':
      currentStep = 3;
      break;
    case 'skills':
      currentStep = 4;
      break;
    case 'templates':
      currentStep = 5;
      break;
  }
  
  updateSteps();
}

// Function to update the step indicator
function updateSteps() {
  steps.forEach(step => {
    const stepNumber = parseInt(step.dataset.step);
    if (stepNumber === currentStep) {
      step.classList.add('active');
      step.classList.remove('completed');
    } else if (stepNumber < currentStep) {
      step.classList.add('completed');
      step.classList.remove('active');
    } else {
      step.classList.remove('active');
      step.classList.remove('completed');
    }
  });
}

// Add event listeners to tab buttons
document.addEventListener('DOMContentLoaded', function() {
  // Set up tab navigation
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      switchTab(this.dataset.tab);
    });
  });
  
  // Set up step number navigation
  steps.forEach(step => {
    step.addEventListener('click', function() {
      const stepNumber = parseInt(this.dataset.step);
      
      // Determine which tab to show based on step number
      switch (stepNumber) {
        case 1:
          switchTab('personal');
          break;
        case 2:
          switchTab('education');
          break;
        case 3:
          switchTab('experience');
          break;
        case 4:
          switchTab('skills');
          break;
        case 5:
          switchTab('templates');
          break;
      }
    });
  });
  
  // Initialize the first tab
  switchTab('personal');
  
  // Set up the navigation buttons from the enhancement script
  addNavigationButtons();
});

// Combine with your existing addNavigationButtons function
function addNavigationButtons() {
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabContents.forEach(content => {
    // Remove any existing navigation buttons
    const existingNav = content.querySelector('.form-navigation');
    if (existingNav) {
      existingNav.remove();
    }
    
    // Add navigation buttons container
    const navContainer = document.createElement('div');
    navContainer.className = 'form-navigation';
    navContainer.style.display = 'flex';
    navContainer.style.justifyContent = 'space-between';
    navContainer.style.marginTop = '30px';
    
    // Determine which tab we're on
    let currentTab = content.id.replace('-tab', '');
    let prevTab = null;
    let nextTab = null;
    
    // Set up previous and next tabs
    switch (currentTab) {
      case 'personal':
        nextTab = 'education';
        break;
      case 'education':
        prevTab = 'personal';
        nextTab = 'experience';
        break;
      case 'experience':
        prevTab = 'education';
        nextTab = 'skills';
        break;
      case 'skills':
        prevTab = 'experience';
        nextTab = 'templates';
        break;
      case 'templates':
        prevTab = 'skills';
        // No next tab, but we'll add a "Preview" button
        break;
    }
    
    // Add back button if needed
    if (prevTab) {
      const backBtn = document.createElement('button');
      backBtn.type = 'button';
      backBtn.className = 'action-btn';
      backBtn.textContent = '← Back';
      backBtn.addEventListener('click', () => {
        switchTab(prevTab);
      });
      navContainer.appendChild(backBtn);
    } else {
      // Add a placeholder to maintain flex layout
      const placeholder = document.createElement('div');
      navContainer.appendChild(placeholder);
    }
    
    // Add next/preview button
    if (nextTab) {
      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'action-btn primary';
      nextBtn.textContent = 'Next →';
      nextBtn.addEventListener('click', () => {
        switchTab(nextTab);
      });
      navContainer.appendChild(nextBtn);
    } else {
      // This is the templates tab, add a preview button
      const previewBtn = document.createElement('button');
      previewBtn.type = 'button';
      previewBtn.className = 'action-btn primary';
      previewBtn.textContent = 'Preview Resume →';
      previewBtn.addEventListener('click', () => {
        updateResumePreview();
        
        // Set the current step to 5 (Finalize)
        currentStep = 5;
        updateSteps();
        
        // Scroll to the resume preview
        document.querySelector('.preview-container').scrollIntoView({
          behavior: 'smooth'
        });
      });
      navContainer.appendChild(previewBtn);
    }
    
    content.appendChild(navContainer);
  });
}
function setupFormValidation() {
  document.getElementById('email').addEventListener('blur', function() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailPattern.test(this.value)) {
      this.style.borderColor = '#e74c3c';
      
      // Create error message if it doesn't exist
      const errorId = 'email-error';
      if (!document.getElementById(errorId)) {
        const errorMsg = document.createElement('div');
        errorMsg.id = errorId;
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Please enter a valid email address';
        this.parentNode.appendChild(errorMsg);
      }
    } else {
      this.style.borderColor = '';
      const errorMsg = document.getElementById('email-error');
      if (errorMsg) {
        errorMsg.remove();
      }
    }
  });
  
  document.getElementById('phone').addEventListener('blur', function() {
    const phonePattern = /^[\d\s\-\(\)\.+]+$/;
    if (this.value && !phonePattern.test(this.value)) {
      this.style.borderColor = '#e74c3c';
      
      // Create error message if it doesn't exist
      const errorId = 'phone-error';
      if (!document.getElementById(errorId)) {
        const errorMsg = document.createElement('div');
        errorMsg.id = errorId;
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Please enter a valid phone number';
        this.parentNode.appendChild(errorMsg);
      }
    } else {
      this.style.borderColor = '';
      const errorMsg = document.getElementById('phone-error');
      if (errorMsg) {
        errorMsg.remove();
      }
    }
  });
}

// Setup form change listeners for auto-updating preview
function setupFormListeners() {
  const formInputs = document.querySelectorAll('.input-field');
  
  formInputs.forEach(input => {
    input.addEventListener('change', function() {
      // Delay update to reduce performance impact
      setTimeout(updateResumePreview, 500);
    });
  });
}

// Function to enhance saved resumes list with delete functionality
function enhanceSavedResumesList() {
  document.getElementById('saved-data-list').addEventListener('click', function(e) {
    // Handle delete button clicks
    if (e.target.classList.contains('delete-resume-btn')) {
      e.stopPropagation(); // Prevent parent click
      const itemId = parseInt(e.target.closest('.saved-item').dataset.id);
      
      if (confirm('Are you sure you want to delete this resume?')) {
        // Get saved resumes
        let savedResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');
        
        // Filter out the deleted resume
        savedResumes = savedResumes.filter(item => item.id !== itemId);
        
        // Save back to localStorage
        localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
        
        // Reload the list
        loadSavedList();
      }
    }
  });
  
  // Override loadSavedList to include delete buttons
  const originalLoadSavedList = loadSavedList;
  loadSavedList = function() {
    originalLoadSavedList();
    
    // Add delete buttons to each item
    document.querySelectorAll('.saved-item').forEach(item => {
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete-resume-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.style.position = 'absolute';
      deleteBtn.style.top = '10px';
      deleteBtn.style.right = '10px';
      deleteBtn.style.padding = '5px 10px';
      deleteBtn.style.backgroundColor = '#e74c3c';
      deleteBtn.style.color = 'white';
      deleteBtn.style.border = 'none';
      deleteBtn.style.borderRadius = '3px';
      deleteBtn.style.cursor = 'pointer';
      
      item.style.position = 'relative';
      item.appendChild(deleteBtn);
    });
  };
}

// Function to add export JSON functionality
function addExportJsonButton() {
  const actionsContainer = document.querySelector('.actions-container');
  
  const exportBtn = document.createElement('button');
  exportBtn.type = 'button';
  exportBtn.id = 'export-json-btn';
  exportBtn.className = 'action-btn';
  exportBtn.textContent = 'Export Data';
  exportBtn.style.backgroundColor = '#3498db';
  
  exportBtn.addEventListener('click', function() {
    // Update the resume preview to ensure all data is current
    updateResumePreview();
    
    // Collect all form data
    const resumeData = {
      template: selectedTemplate,
      personal: {
        name: document.getElementById('name').value,
        title: document.getElementById('title').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        summary: document.getElementById('summary').value
      },
      education: [],
      experience: [],
      skills: []
    };
    
    // Collect education data
    document.querySelectorAll('.education-entry').forEach(entry => {
      const id = entry.dataset.id;
      resumeData.education.push({
        school: document.getElementById(`edu-school-${id}`).value,
        degree: document.getElementById(`edu-degree-${id}`).value,
        date: document.getElementById(`edu-date-${id}`).value,
        description: document.getElementById(`edu-description-${id}`).value
      });
    });
    
    // Collect experience data
    document.querySelectorAll('.experience-entry').forEach(entry => {
      const id = entry.dataset.id;
      resumeData.experience.push({
        company: document.getElementById(`exp-company-${id}`).value,
        title: document.getElementById(`exp-title-${id}`).value,
        date: document.getElementById(`exp-date-${id}`).value,
        description: document.getElementById(`exp-description-${id}`).value
      });
    });
    
    // Collect skills data
    document.querySelectorAll('.skill-entry').forEach(entry => {
      const id = entry.dataset.id;
      const skillName = document.getElementById(`skill-name-${id}`).value;
      if (skillName) {
        resumeData.skills.push({
          name: skillName
        });
      }
    });
    
    // Convert to JSON string
    const dataStr = JSON.stringify(resumeData, null, 2);
    
    // Create a download link
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `resume_data_${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  });
  
  actionsContainer.appendChild(exportBtn);
}

// Function to add import JSON functionality
function addImportJsonButton() {
  const actionsContainer = document.querySelector('.actions-container');
  
  const importBtn = document.createElement('button');
  importBtn.type = 'button';
  importBtn.id = 'import-json-btn';
  importBtn.className = 'action-btn';
  importBtn.textContent = 'Import Data';
  importBtn.style.backgroundColor = '#9b59b6';
  
  // Create a hidden file input
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.id = 'resume-file-input';
  fileInput.accept = '.json';
  fileInput.style.display = 'none';
  
  fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // Load template selection
        if (importedData.template) {
          selectedTemplate = importedData.template;
          document.querySelectorAll('.template-option').forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.template === selectedTemplate) {
              option.classList.add('selected');
            }
          });
        }
        
        // Load personal info
        if (importedData.personal) {
          document.getElementById('name').value = importedData.personal.name || '';
          document.getElementById('title').value = importedData.personal.title || '';
          document.getElementById('email').value = importedData.personal.email || '';
          document.getElementById('phone').value = importedData.personal.phone || '';
          document.getElementById('location').value = importedData.personal.location || '';
          document.getElementById('summary').value = importedData.personal.summary || '';
        }
        
        // Clear existing sections
        document.getElementById('education-container').innerHTML = '';
        document.getElementById('experience-container').innerHTML = '';
        document.getElementById('skills-container').innerHTML = '';
        
        // Reset counters
        educationCount = 0;
        experienceCount = 0;
        skillCount = 0;
        
        // Load education entries
        if (importedData.education && importedData.education.length > 0) {
          importedData.education.forEach(edu => {
            const educationContainer = document.getElementById('education-container');
            const educationId = educationCount++;
            
            const educationEntry = document.createElement('div');
            educationEntry.className = 'education-entry';
            educationEntry.dataset.id = educationId;
            educationEntry.innerHTML = `
              <button type="button" class="remove-btn" onclick="removeEducation(${educationId})">×</button>
              <div class="form-group">
                <label for="edu-school-${educationId}">School/University</label>
                <input type="text" id="edu-school-${educationId}" class="input-field edu-school" value="${edu.school || ''}">
              </div>
              <div class="form-group">
                <label for="edu-degree-${educationId}">Degree</label>
                <input type="text" id="edu-degree-${educationId}" class="input-field edu-degree" value="${edu.degree || ''}">
              </div>
              <div class="form-group">
                <label for="edu-date-${educationId}">Date Range</label>
                <input type="text" id="edu-date-${educationId}" class="input-field edu-date" value="${edu.date || ''}">
              </div>
              <div class="form-group">
                <label for="edu-description-${educationId}">Description</label>
                <textarea id="edu-description-${educationId}" rows="3" class="input-field edu-description">${edu.description || ''}</textarea>
              </div>
            `;
            
            educationContainer.appendChild(educationEntry);
          });
        } else {
          addEducation();
        }
        
        // Load experience entries
        if (importedData.experience && importedData.experience.length > 0) {
          importedData.experience.forEach(exp => {
            const experienceContainer = document.getElementById('experience-container');
            const experienceId = experienceCount++;
            
            const experienceEntry = document.createElement('div');
            experienceEntry.className = 'experience-entry';
            experienceEntry.dataset.id = experienceId;
            experienceEntry.innerHTML = `
              <button type="button" class="remove-btn" onclick="removeExperience(${experienceId})">×</button>
              <div class="form-group">
                <label for="exp-company-${experienceId}">Company</label>
                <input type="text" id="exp-company-${experienceId}" class="input-field exp-company" value="${exp.company || ''}">
              </div>
              <div class="form-group">
                <label for="exp-title-${experienceId}">Job Title</label>
                <input type="text" id="exp-title-${experienceId}" class="input-field exp-title" value="${exp.title || ''}">
              </div>
              <div class="form-group">
                <label for="exp-date-${experienceId}">Date Range</label>
                <input type="text" id="exp-date-${experienceId}" class="input-field exp-date" value="${exp.date || ''}">
              </div>
              <div class="form-group">
                <label for="exp-description-${experienceId}">Description</label>
                <textarea id="exp-description-${experienceId}" rows="3" class="input-field exp-description">${exp.description || ''}</textarea>
              </div>
            `;
            
            experienceContainer.appendChild(experienceEntry);
          });
        } else {
          addExperience();
        }
        
        // Load skills entries
        if (importedData.skills && importedData.skills.length > 0) {
          importedData.skills.forEach(skill => {
            const skillsContainer = document.getElementById('skills-container');
            const skillId = skillCount++;
            
            const skillEntry = document.createElement('div');
            skillEntry.className = 'skill-entry';
            skillEntry.dataset.id = skillId;
            skillEntry.innerHTML = `
              <button type="button" class="remove-btn" onclick="removeSkill(${skillId})">×</button>
              <div class="form-group">
                <label for="skill-name-${skillId}">Skill</label>
                <input type="text" id="skill-name-${skillId}" class="input-field skill-name" value="${skill.name || ''}">
              </div>
            `;
            
            skillsContainer.appendChild(skillEntry);
          });
        } else {
          addSkill();
        }
        
        // Update preview
        updateResumePreview();
        
        // Show confirmation
        alert('Resume data imported successfully!');
        
      } catch (error) {
        console.error('Error importing JSON:', error);
        alert('Error importing data. Please make sure the file is valid JSON.');
      }
    };
    
    reader.readAsText(file);
    
    // Reset the file input so the same file can be selected again
    fileInput.value = '';
  });
  
  importBtn.addEventListener('click', function() {
    fileInput.click();
  });
  
  actionsContainer.appendChild(importBtn);
  document.body.appendChild(fileInput);
}

// Function to reorder resume sections in preview
function reorderResumeSections() {
  // This function can be extended to support drag-and-drop
  // section reordering in future enhancements
}

// Function to add a new education entry
function addEducation() {
  const educationContainer = document.getElementById('education-container');
  const educationId = educationCount++;
  
  const educationEntry = document.createElement('div');
  educationEntry.className = 'education-entry';
  educationEntry.dataset.id = educationId;
  educationEntry.innerHTML = `
    <button type="button" class="remove-btn" onclick="removeEducation(${educationId})">×</button>
    <div class="form-group">
      <label for="edu-school-${educationId}">School/University</label>
      <input type="text" id="edu-school-${educationId}" class="input-field edu-school" placeholder="Enter school or university name">
    </div>
    <div class="form-group">
      <label for="edu-degree-${educationId}">Degree</label>
      <input type="text" id="edu-degree-${educationId}" class="input-field edu-degree" placeholder="Enter degree (e.g., Bachelor of Science in Computer Science)">
    </div>
    <div class="form-row">
      <div class="form-group half">
        <label for="edu-start-year-${educationId}">Start Year</label>
        <input type="text" id="edu-start-year-${educationId}" class="input-field edu-start-year" placeholder="Enter start year">
      </div>
      <div class="form-group half">
        <label for="edu-grad-year-${educationId}">Graduation Year</label>
        <input type="text" id="edu-grad-year-${educationId}" class="input-field edu-grad-year" placeholder="Enter graduation year">
      </div>
    </div>
    <div class="form-group">
      <label for="edu-description-${educationId}">Description (Optional)</label>
      <textarea id="edu-description-${educationId}" rows="3" class="input-field edu-description" placeholder="Enter relevant coursework, achievements, etc."></textarea>
    </div>
  `;
  
  educationContainer.appendChild(educationEntry);

  // Add some CSS for the new row layout
  if (!document.getElementById('education-row-style')) {
    const style = document.createElement('style');
    style.id = 'education-row-style';
    style.innerHTML = `
      .form-row {
        display: flex;
        gap: 15px;
      }
      .form-group.half {
        flex: 1;
      }
    `;
    document.head.appendChild(style);
  }
}

// Modify this section within updateResumePreview()
document.querySelectorAll('.education-entry').forEach(entry => {
  const id = entry.dataset.id;
  const school = document.getElementById(`edu-school-${id}`).value || 'School Name';
  const degree = document.getElementById(`edu-degree-${id}`).value || 'Degree';
  const startYear = document.getElementById(`edu-start-year-${id}`).value || '';
  const gradYear = document.getElementById(`edu-grad-year-${id}`).value || '';
  const description = document.getElementById(`edu-description-${id}`).value || '';
  
  // Format the date string with start and graduation years
  let dateDisplay = '';
  if (startYear && gradYear) {
    dateDisplay = `${startYear} - ${gradYear}`;
  } else if (startYear) {
    dateDisplay = `${startYear} - Present`;
  } else if (gradYear) {
    dateDisplay = `Graduated: ${gradYear}`;
  }
  
  educationHTML += `
    <div class="resume-item">
      <div class="item-header">
        <h3>${school}</h3>
        <span class="item-date">${dateDisplay}</span>
      </div>
      <h4>${degree}</h4>
      <p>${description}</p>
    </div>
  `;
});

// Collect education data in saveResumeData()
document.querySelectorAll('.education-entry').forEach(entry => {
  const id = entry.dataset.id;
  resumeData.education.push({
    school: document.getElementById(`edu-school-${id}`).value,
    degree: document.getElementById(`edu-degree-${id}`).value,
    startYear: document.getElementById(`edu-start-year-${id}`).value,
    gradYear: document.getElementById(`edu-grad-year-${id}`).value,
    description: document.getElementById(`edu-description-${id}`).value
  });
});

// Inside loadResume(), update the education entry creation
if (resume.education && resume.education.length > 0) {
  resume.education.forEach(edu => {
    const educationContainer = document.getElementById('education-container');
    const educationId = educationCount++;
    
    const educationEntry = document.createElement('div');
    educationEntry.className = 'education-entry';
    educationEntry.dataset.id = educationId;
    educationEntry.innerHTML = `
      <button type="button" class="remove-btn" onclick="removeEducation(${educationId})">×</button>
      <div class="form-group">
        <label for="edu-school-${educationId}">School/University</label>
        <input type="text" id="edu-school-${educationId}" class="input-field edu-school" value="${edu.school || ''}">
      </div>
      <div class="form-group">
        <label for="edu-degree-${educationId}">Degree</label>
        <input type="text" id="edu-degree-${educationId}" class="input-field edu-degree" value="${edu.degree || ''}">
      </div>
      <div class="form-row">
        <div class="form-group half">
          <label for="edu-start-year-${educationId}">Start Year</label>
          <input type="text" id="edu-start-year-${educationId}" class="input-field edu-start-year" value="${edu.startYear || ''}">
        </div>
        <div class="form-group half">
          <label for="edu-grad-year-${educationId}">Graduation Year</label>
          <input type="text" id="edu-grad-year-${educationId}" class="input-field edu-grad-year" value="${edu.gradYear || ''}">
        </div>
      </div>
      <div class="form-group">
        <label for="edu-description-${educationId}">Description (Optional)</label>
        <textarea id="edu-description-${educationId}" rows="3" class="input-field edu-description">${edu.description || ''}</textarea>
      </div>
    `;
    
    educationContainer.appendChild(educationEntry);
  });
}

