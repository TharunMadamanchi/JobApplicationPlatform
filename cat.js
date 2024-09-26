const jobs = [
    { id: 1, title: "Frontend Developer", company: "ABC Corp", location: "Remote" },
    { id: 2, title: "Backend Developer", company: "XYZ Ltd", location: "New York" },
    { id: 3, title: "Fullstack Developer", company: "Tech Solutions", location: "San Francisco" },
    { id: 4, title: "Data Analyst", company: "Data Corp", location: "Remote" },
];

// Function to show the selected tab and hide others
function showTab(tabId) {
    // Hide all sections
    document.querySelectorAll('.job-listings, .profile-form, .job-post-form').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(tabId).classList.add('active');

    // Add active class to the clicked button
    document.querySelector(`button[onclick="showTab('${tabId}')"]`).classList.add('active');

    // Only display jobs if the Job Listings tab is selected
    if (tabId === 'job-listings') {
        displayJobs();
    } else {
        // Clear job listings when switching to other tabs
        document.getElementById('job-cards').innerHTML = '';
    }
}

// Function to display jobs in the Job Listings section
function displayJobs() {
    const jobCards = document.getElementById('job-cards');
    jobCards.innerHTML = ''; // Clear existing job listings
    jobs.forEach(job => {
        const jobCard = `
            <div class="job-card">
                <h2>${job.title}</h2>
                <p>Company: ${job.company}</p>
                <p>Location: ${job.location}</p>
                <button onclick="applyJob(${job.id})">Apply</button>
            </div>
        `;
        jobCards.innerHTML += jobCard;
    });
}

// Function to apply for a job
function applyJob(jobId) {
    const job = jobs.find(job => job.id === jobId);
    alert(`You have successfully applied for the position of ${job.title} at ${job.company}`);
}

// Function to filter jobs by search input
function filterJobs() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchInput) ||
        job.company.toLowerCase().includes(searchInput) ||
        job.location.toLowerCase().includes(searchInput)
    );
    const jobCards = document.getElementById('job-cards');
    jobCards.innerHTML = '';

    filteredJobs.forEach(job => {
        const jobCard = `
            <div class="job-card">
                <h2>${job.title}</h2>
                <p>Company: ${job.company}</p>
                <p>Location: ${job.location}</p>
                <button onclick="applyJob(${job.id})">Apply</button>
            </div>
        `;
        jobCards.innerHTML += jobCard;
    });
}

// Function to handle profile submission
function submitProfile(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const resume = document.getElementById('resume').value;
    console.log("Profile Saved:", { name, email, resume });
    alert("Profile Created Successfully!");
    document.getElementById('profileForm').reset();
}

// Function to handle job posting
function postJob(event) {
    event.preventDefault();
    const jobTitle = document.getElementById('jobTitle').value;
    const company = document.getElementById('company').value;
    const location = document.getElementById('location').value;
    jobs.push({ id: jobs.length + 1, title: jobTitle, company, location });
    alert("Job Posted Successfully!");
    document.getElementById('jobForm').reset();
    displayJobs(); // Update job listings with the new job
}
