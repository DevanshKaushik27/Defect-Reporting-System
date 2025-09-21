// Main JavaScript file for Defect Capture System

// API endpoints
const API_BASE_URL = 'http://localhost:3000/api';

// Utility functions
const showAlert = (message, type = 'success') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.querySelector('.container').prepend(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
};

// Login functionality
const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value.trim();
    const password = form.password.value.trim();
    
    // Reset validation state
    form.classList.remove('was-validated');
    
    // Validate form
    if (!username || !password) {
        form.classList.add('was-validated');
        return;
    }
    
    // In a real application, you would send these credentials to your server
    // For this example, we'll just navigate to the capture page
    window.location.href = 'capture.html';
};

// Defect management functions
const fetchDefects = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/defects`);
        const defects = await response.json();
        return defects;
    } catch (error) {
        console.error('Error fetching defects:', error);
        showAlert('Error fetching defects', 'danger');
        return [];
    }
};

const createDefect = async (defectData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/defects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(defectData)
        });
        const newDefect = await response.json();
        showAlert('Defect created successfully');
        return newDefect;
    } catch (error) {
        console.error('Error creating defect:', error);
        showAlert('Error creating defect', 'danger');
        throw error;
    }
};

const updateDefect = async (id, defectData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/defects/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(defectData)
        });
        const updatedDefect = await response.json();
        showAlert('Defect updated successfully');
        return updatedDefect;
    } catch (error) {
        console.error('Error updating defect:', error);
        showAlert('Error updating defect', 'danger');
        throw error;
    }
};

// Form handling
const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const defectData = Object.fromEntries(formData.entries());
    
    try {
        await createDefect(defectData);
        form.reset();
    } catch (error) {
        console.error('Form submission error:', error);
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Add form submit event listeners
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const defectForm = document.getElementById('defectForm');
    if (defectForm) {
        defectForm.addEventListener('submit', handleFormSubmit);
    }

    // Initialize any Bootstrap components
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}); 