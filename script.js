// Sample course data
const courses = [
    {
        id: 1,
        title: "The Complete JavaScript Course 2023",
        instructor: "John Doe",
        image: "images/course1.jpg",
        rating: 4.7,
        students: 1250,
        price: 89.99,
        category: "Web Development"
    },
    {
        id: 2,
        title: "Python for Data Science and Machine Learning",
        instructor: "Jane Smith",
        image: "images/course2.jpg",
        rating: 4.8,
        students: 980,
        price: 99.99,
        category: "Data Science"
    },
    {
        id: 3,
        title: "The Complete Web Developer Bootcamp",
        instructor: "Mike Johnson",
        image: "images/course3.jpg",
        rating: 4.6,
        students: 2100,
        price: 79.99,
        category: "Web Development"
    },
    {
        id: 4,
        title: "iOS 13 & Swift 5 - Complete iOS App Development",
        instructor: "Sarah Williams",
        image: "images/course4.jpg",
        rating: 4.9,
        students: 750,
        price: 109.99,
        category: "Mobile Development"
    }
];

// Sample testimonials data
const testimonials = [
    {
        name: "Robert Johnson",
        position: "Web Developer",
        quote: "EduLearn has transformed the way I learn. The courses are comprehensive and taught by industry experts.",
        image: "images/testimonial1.jpg"
    },
    {
        name: "Emily Davis",
        position: "Data Scientist",
        quote: "I was able to switch careers thanks to the amazing Data Science courses on EduLearn. Highly recommended!",
        image: "images/testimonial2.jpg"
    },
    {
        name: "Michael Brown",
        position: "Mobile Developer",
        quote: "The hands-on projects in the courses helped me build a strong portfolio that got me hired.",
        image: "images/testimonial3.jpg"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load courses on homepage
    if (document.getElementById('courseContainer')) {
        loadCourses();
    }
    
    // Load testimonials
    if (document.getElementById('testimonialCarousel')) {
        loadTestimonials();
    }
    
    // User registration form handling
    if (document.getElementById('registerForm')) {
        setupRegistrationForm();
    }
    
    // Login form handling
    if (document.getElementById('loginForm')) {
        setupLoginForm();
    }
});

// Load courses function
function loadCourses() {
    const courseContainer = document.getElementById('courseContainer');
    
    // Clear existing content
    courseContainer.innerHTML = '';
    
    // Add courses to the container
    courses.slice(0, 4).forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'col-md-3 mb-4';
        courseCard.innerHTML = `
            <div class="card course-card h-100">
                <img src="${course.image}" class="card-img-top" alt="${course.title}">
                <div class="card-body">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="instructor">${course.instructor}</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="rating"><i class="fas fa-star text-warning"></i> ${course.rating}</span>
                        <span class="students"><i class="fas fa-user-graduate"></i> ${course.students}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="price">$${course.price}</span>
                        <a href="course-detail.html?id=${course.id}" class="btn btn-sm btn-primary">Enroll Now</a>
                    </div>
                </div>
            </div>
        `;
        courseContainer.appendChild(courseCard);
    });
}

// Load testimonials function
function loadTestimonials() {
    const carouselInner = document.querySelector('.carousel-inner');
    
    testimonials.forEach((testimonial, index) => {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        testimonialItem.innerHTML = `
            <div class="testimonial-item">
                <img src="${testimonial.image}" alt="${testimonial.name}">
                <p class="quote">"${testimonial.quote}"</p>
                <h5 class="name">${testimonial.name}</h5>
                <p class="position">${testimonial.position}</p>
            </div>
        `;
        carouselInner.appendChild(testimonialItem);
    });
    
    // Add carousel controls
    const carousel = document.getElementById('testimonialCarousel');
    carousel.innerHTML += `
        <button class="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    `;
}

// Registration form handling
function setupRegistrationForm() {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Simple validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // In a real app, you would send this data to a server
        alert(`Registration successful! Welcome ${name}. You can now login.`);
        
        // Redirect to login page
        window.location.href = 'login.html';
    });
}

// Login form handling
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Check user credentials (simulated with localStorage)
        const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
        console.log('Stored user:', registeredUser); // Debugging line
        console.log('Entered email:', email, 'Entered password:', password); // Debugging line
        
        if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
            alert('Login successful! Redirecting to dashboard...');
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
}

// Course detail page functionality
if (window.location.pathname.includes('course-detail.html')) {
    displayCourseDetails();
}

function displayCourseDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    if (courseId) {
        const course = courses.find(c => c.id === parseInt(courseId));
        
        if (course) {
            document.title = `${course.title} | EduLearn`;
            
            const courseDetailContainer = document.getElementById('courseDetail');
            courseDetailContainer.innerHTML = `
                <div class="row">
                    <div class="col-md-8">
                        <div class="card mb-4">
                            <img src="${course.image}" class="card-img-top" alt="${course.title}">
                            <div class="card-body">
                                <h1 class="card-title">${course.title}</h1>
                                <p class="instructor">Instructor: ${course.instructor}</p>
                                <div class="d-flex align-items-center mb-3">
                                    <span class="rating me-3"><i class="fas fa-star text-warning"></i> ${course.rating}</span>
                                    <span class="students me-3"><i class="fas fa-user-graduate"></i> ${course.students} students</span>
                                    <span class="category badge bg-primary">${course.category}</span>
                                </div>
                                <h3>Course Description</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.</p>
                                <h3>What You'll Learn</h3>
                                <ul>
                                    <li>Master the fundamentals of ${course.category}</li>
                                    <li>Build real-world projects</li>
                                    <li>Learn best practices from industry experts</li>
                                    <li>Get a certificate of completion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Course Price</h4>
                                <h2 class="price">$${course.price}</h2>
                                <button class="btn btn-primary w-100 mb-3">Enroll Now</button>
                                <button class="btn btn-outline-secondary w-100">Add to Wishlist</button>
                                <hr>
                                <h5>This course includes:</h5>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-video me-2"></i> 30 hours on-demand video</li>
                                    <li><i class="fas fa-file-alt me-2"></i> 15 articles</li>
                                    <li><i class="fas fa-download me-2"></i> Downloadable resources</li>
                                    <li><i class="fas fa-infinity me-2"></i> Full lifetime access</li>
                                    <li><i class="fas fa-mobile-alt me-2"></i> Access on mobile and TV</li>
                                    <li><i class="fas fa-trophy me-2"></i> Certificate of completion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            document.getElementById('courseDetail').innerHTML = `
                <div class="alert alert-danger">Course not found. <a href="courses.html">Browse all courses</a></div>
            `;
        }
    }
}