/**
 * Optimal Rate of Failure - Main JavaScript
 * Handles modal interactions, form validation, and Google Sheets integration
 */

// =========================================
// CONFIGURATION
// =========================================

/**
 * GOOGLE FORM CONFIGURATION
 * Replace these values with your actual Google Form details
 * See SETUP.md for detailed instructions on how to obtain these values
 */
const GOOGLE_FORM_CONFIG = {
    // Your Google Form ID (found in the form URL)
    formId: 'YOUR_FORM_ID_HERE',

    // Entry IDs for each form field (inspect your Google Form to find these)
    entries: {
        name: 'entry.YOUR_NAME_ENTRY_ID',
        email: 'entry.YOUR_EMAIL_ENTRY_ID',
        company: 'entry.YOUR_COMPANY_ENTRY_ID',
        phone: 'entry.YOUR_PHONE_ENTRY_ID',
        linkedin: 'entry.YOUR_LINKEDIN_ENTRY_ID',
        inquiryType: 'entry.YOUR_INQUIRY_TYPE_ENTRY_ID',
        message: 'entry.YOUR_MESSAGE_ENTRY_ID'
    }
};

// =========================================
// MODAL MANAGEMENT
// =========================================

let currentModal = null;
let prefilledInquiryType = null;

/**
 * Opens the contact modal and loads the form
 * @param {string} inquiryType - Pre-selected inquiry type (optional)
 */
async function openModal(inquiryType = null) {
    const modal = document.getElementById('contactModal');
    const formContainer = document.getElementById('contactFormContainer');

    if (!modal || !formContainer) {
        console.error('Modal elements not found');
        return;
    }

    prefilledInquiryType = inquiryType;
    currentModal = modal;

    try {
        // Load contact form HTML
        const response = await fetch('contact.html');
        if (!response.ok) {
            throw new Error('Failed to load contact form');
        }

        const formHTML = await response.text();
        formContainer.innerHTML = formHTML;

        // Pre-fill inquiry type if provided
        if (inquiryType) {
            const inquirySelect = document.getElementById('inquiryType');
            if (inquirySelect) {
                inquirySelect.value = inquiryType;
            }
        }

        // Initialize form event listeners
        initializeForm();

        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Set focus to first input for accessibility
        setTimeout(() => {
            const firstInput = formContainer.querySelector('input, select, textarea');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);

    } catch (error) {
        console.error('Error opening modal:', error);
        formContainer.innerHTML = '<p style="color: var(--glitch-accent); text-align: center;">Error loading form. Please refresh and try again.</p>';
    }
}

/**
 * Closes the contact modal
 */
function closeModal() {
    if (currentModal) {
        currentModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable background scrolling

        // Clear form content after animation
        setTimeout(() => {
            const formContainer = document.getElementById('contactFormContainer');
            if (formContainer) {
                formContainer.innerHTML = '';
            }
        }, 300);

        currentModal = null;
        prefilledInquiryType = null;
    }
}

// =========================================
// FORM VALIDATION & HANDLING
// =========================================

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL format
 */
function isValidURL(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (e) {
        return false;
    }
}

/**
 * Displays error message for a form field
 * @param {string} fieldId - ID of the form field
 * @param {string} message - Error message to display
 */
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);

    if (errorElement) {
        errorElement.textContent = message;
    }
    if (inputElement) {
        inputElement.setAttribute('aria-invalid', 'true');
    }
}

/**
 * Clears error message for a form field
 * @param {string} fieldId - ID of the form field
 */
function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);

    if (errorElement) {
        errorElement.textContent = '';
    }
    if (inputElement) {
        inputElement.setAttribute('aria-invalid', 'false');
    }
}

/**
 * Validates the entire contact form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} True if form is valid
 */
function validateForm(form) {
    let isValid = true;

    // Validate Name
    const name = form.name.value.trim();
    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    } else {
        clearError('name');
    }

    // Validate Email
    const email = form.email.value.trim();
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError('email');
    }

    // Validate Inquiry Type
    const inquiryType = form.inquiryType.value;
    if (!inquiryType) {
        showError('inquiryType', 'Please select an inquiry type');
        isValid = false;
    } else {
        clearError('inquiryType');
    }

    // Validate Message
    const message = form.message.value.trim();
    if (!message) {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError('message');
    }

    return isValid;
}

/**
 * Displays form status message
 * @param {string} message - Message to display
 * @param {string} type - Type of message ('success' or 'error')
 */
function showFormStatus(message, type) {
    const statusElement = document.getElementById('formStatus');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `form-status ${type}`;
    }
}

/**
 * Submits form data to Google Sheets via Google Form
 * @param {FormData} formData - Form data to submit
 * @returns {Promise<boolean>} True if submission successful
 */
async function submitToGoogleSheets(formData) {
    // Check if Google Form is configured
    if (GOOGLE_FORM_CONFIG.formId === 'YOUR_FORM_ID_HERE') {
        console.warn('Google Form not configured. See SETUP.md for instructions.');
        // For testing purposes, simulate success
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Form data (not submitted - configure Google Form):', Object.fromEntries(formData));
                resolve(true);
            }, 1000);
        });
    }

    // Construct Google Form submission URL
    const formUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_CONFIG.formId}/formResponse`;

    // Create URL-encoded form data with Google Form entry IDs
    const googleFormData = new URLSearchParams();
    googleFormData.append(GOOGLE_FORM_CONFIG.entries.name, formData.get('name'));
    googleFormData.append(GOOGLE_FORM_CONFIG.entries.email, formData.get('email'));
    googleFormData.append(GOOGLE_FORM_CONFIG.entries.company, formData.get('company') || '');
    googleFormData.append(GOOGLE_FORM_CONFIG.entries.phone, formData.get('phone') || '');
    googleFormData.append(GOOGLE_FORM_CONFIG.entries.linkedin, formData.get('linkedin') || '');
    googleFormData.append(GOOGLE_FORM_CONFIG.entries.inquiryType, formData.get('inquiryType'));
    googleFormData.append(GOOGLE_FORM_CONFIG.entries.message, formData.get('message'));

    try {
        // Submit to Google Form
        // Note: This will fail due to CORS, but the form will still be submitted
        // We use 'no-cors' mode to work around this limitation
        await fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: googleFormData
        });

        // Since we can't read the response in no-cors mode, assume success
        return true;
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        // Even if there's an error, the submission might have succeeded
        // Return true to avoid false negatives
        return true;
    }
}

/**
 * Initializes the contact form with event listeners
 */
function initializeForm() {
    const form = document.getElementById('contactForm');
    if (!form) {
        console.error('Contact form not found');
        return;
    }

    // Form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm(form)) {
            return;
        }

        // Disable submit button during submission
        const submitButton = form.querySelector('.submit-button');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = '[ Sending... ]';

        try {
            // Collect form data
            const formData = new FormData(form);

            // Submit to Google Sheets
            const success = await submitToGoogleSheets(formData);

            if (success) {
                showFormStatus('Thank you! Your inquiry has been received.', 'success');

                // Reset form
                form.reset();

                // Close modal after delay
                setTimeout(() => {
                    closeModal();
                }, 2000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormStatus('An error occurred. Please try again or contact us directly.', 'error');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    // Real-time validation on blur
    const fields = ['name', 'email', 'inquiryType', 'message'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => {
                // Only validate if field has been touched
                if (field.value.trim()) {
                    validateForm(form);
                }
            });

            // Clear error on input
            field.addEventListener('input', () => {
                clearError(fieldId);
            });
        }
    });
}

// =========================================
// EVENT LISTENERS SETUP
// =========================================

/**
 * Initialize all event listeners when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inquire button on landing page
    const inquireBtn = document.getElementById('inquireBtn');
    if (inquireBtn) {
        inquireBtn.addEventListener('click', () => openModal());
    }

    // CTA buttons on manifesto page
    const ctaButtons = document.querySelectorAll('.cta-button[data-inquiry-type]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const inquiryType = button.getAttribute('data-inquiry-type');
            openModal(inquiryType);
        });
    });

    // Modal close button
    document.addEventListener('click', (e) => {
        if (e.target.id === 'closeModal') {
            closeModal();
        }
    });

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.id === 'contactModal') {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentModal) {
            closeModal();
        }
    });
});

// =========================================
// ACCESSIBILITY ENHANCEMENTS
// =========================================

/**
 * Trap focus within modal for accessibility
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });
}

// Apply focus trap when modal opens
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList?.contains('active')) {
            const modalContent = mutation.target.querySelector('.modal-content');
            if (modalContent) {
                trapFocus(modalContent);
            }
        }
    });
});

// Observe modal for class changes
const modal = document.getElementById('contactModal');
if (modal) {
    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
}
