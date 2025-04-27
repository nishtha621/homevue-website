// Data
const features = [
  { title: "Room Scanning", description: "Scan your room using cutting-edge AR technology to create accurate digital representations of your space.", icon: "data-collection.gif" },
  { title: "Multi-Object Placement", description: "Place multiple furniture pieces simultaneously to create complete room layouts.", icon: "3d-cube.gif" },
  { title: "Real-World Accuracy", description: "Experience realistic furniture placement with advanced occlusion technology.", icon: "accurate.gif" },
  { title: "Prebuilt Rooms", description: "Save and revisit your favorite room designs anytime.", icon: "save.gif" },
  { title: "Design Sharing", description: "Share your room designs with friends, family, or professional designers.", icon: "share.gif" },
  { title: "Furniture Catalog", description: "Browse through an extensive collection of furniture models organized by category.", icon: "model.gif" },
];

const team = [
  { name: "Nishtha Tandon", role: "Lead Developer", email: "nishtha@homevue.dev", linkedin: "#" },
  { name: "Bhumi Garg", role: "AR Technology Lead", email: "bhumi@homevue.dev", linkedin: "#" },
  { name: "Aman Prasad", role: "UI/UX Developer", email: "aman@homevue.dev", linkedin: "#" },
  { name: "Aditya Prasad", role: "Backend Developer", email: "aditya@homevue.dev", linkedin: "#" },
];

const faqs = [
  { question: "What devices are compatible with HomeVue?", answer: "HomeVue requires iOS 15.0 or later and is compatible with iPhone and iPad devices that support ARKit. Enhanced features are available for LiDAR-equipped devices." },
  { question: "Is HomeVue free to use?", answer: "Yes, HomeVue is completely free to use with no in-app purchases required." },
  { question: "Can I save my room designs?", answer: "Yes, you can save multiple room designs as 'Prebuilt Rooms' and access them anytime within the app." },
  { question: "How accurate is the AR furniture placement?", answer: "HomeVue uses advanced AR technology and LiDAR (when available) to ensure highly accurate furniture placement and scaling in your space." }
];



// Inject Features with glowing effects and animations
const featuresList = document.getElementById('features-list');
features.forEach((feature, index) => {
  featuresList.innerHTML += `
    <div class="feature-card glow-card" style="animation-delay: ${index * 0.15}s">
      <div class="feature-icon"><img src="${feature.icon}" alt="${feature.title}"></div>
      <h3>${feature.title}</h3>
      <p>${feature.description}</p>
      <div class="glow-effect"></div>
    </div>
  `;
});

// Inject Team
const teamList = document.getElementById('team-list');
team.forEach(member => {
  teamList.innerHTML += `
    <div class="team-card">
      <div class="avatar">${member.name.charAt(0)}</div>
      <h3>${member.name}</h3>
      <p>${member.role}</p>
    </div>
  `;
});

// Inject FAQs
const faqList = document.getElementById('faq-list');
faqs.forEach((faq, index) => {
  faqList.innerHTML += `
    <div class="accordion" onclick="toggleAccordion(${index})">${faq.question}</div>
    <div class="panel" id="panel-${index}"><p>${faq.answer}</p></div>
  `;
});

function toggleAccordion(index) {
  const panel = document.getElementById(`panel-${index}`);
  const accordion = panel.previousElementSibling;
  accordion.classList.toggle("active");
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
}





// Add scroll reveal animations
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
  const elements = document.querySelectorAll('.feature-card, .team-card, .accordion');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}


// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  // Add scrolled class to navbar when scrolling
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Update scroll indicator width
  const scrollPosition = window.scrollY;
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollPosition / totalHeight) * 100;
  
  if (scrollIndicator) {
    scrollIndicator.style.width = scrollPercentage + '%';
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Add animation class before scrolling
      targetElement.classList.add('animating');
      
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust for navbar height
        behavior: 'smooth'
      });
      
      // Add special animation effect
      setTimeout(() => {
        targetElement.classList.remove('animating');
      }, 1000);
    }
  });
});

// Reveal sections on scroll
const revealSections = () => {
  const sections = document.querySelectorAll('.section');
  const windowHeight = window.innerHeight;
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    
    if (sectionTop < windowHeight - 150) {
      section.classList.add('visible');
      
      // Animate children with staggered delay
      const elements = section.querySelectorAll('.feature-card, .team-card, .accordion');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.style.animation = `fadeInUp 0.6s ease forwards`;
        }, 150 * index);
      });
    }
  });
};

// Run on scroll and on page load
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);
  