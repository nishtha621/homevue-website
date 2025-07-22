// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add scroll indicator functionality
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  document.querySelector('.navbar').appendChild(scrollIndicator);

  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollIndicator.style.width = scrolled + '%';
    
    // Add scrolled class to navbar
    if (winScroll > 50) {
      document.querySelector('.navbar').classList.add('scrolled');
    } else {
      document.querySelector('.navbar').classList.remove('scrolled');
    }
  });

  // Add floating animation to feature cards
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = (index * 0.2) + 's';
    card.classList.add(index % 2 === 0 ? 'float-1' : 'float-2');
  });

  // Search functionality
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  
  if (searchInput && searchButton) {
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length < 2) return;
    
    // Simple search implementation - highlight matching content
    const contentElements = document.querySelectorAll('.support-card, .accordion-item');
    let matchFound = false;
    
    contentElements.forEach(element => {
      const text = element.textContent.toLowerCase();
      if (text.includes(query)) {
        element.classList.add('search-match');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        matchFound = true;
        
        // For accordion items, expand them if they match
        if (element.classList.contains('accordion-item')) {
          element.classList.add('active');
          const icon = element.querySelector('.accordion-icon');
          if (icon) {
            icon.setAttribute('data-lucide', 'chevron-up');
            lucide.createIcons();
          }
        }
      } else {
        element.classList.remove('search-match');
      }
    });
    
    if (!matchFound) {
      alert('No results found for "' + query + '". Please try a different search term.');
    }
  }

  // Add live chat functionality (placeholder)
  const chatButton = document.querySelector('.contact-card .contact-button');
  if (chatButton && chatButton.textContent.includes('Start Chat')) {
    chatButton.addEventListener('click', function() {
      alert('Live chat support is available Monday to Friday, 9am-5pm EST. Please try again during business hours or leave a message using the form below.');
    });
  }

  // Form submission handling
  const supportForm = document.querySelector('.support-form form');
  if (supportForm) {
    supportForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const issue = document.getElementById('issue').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !issue || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Simulate form submission
      const submitButton = document.querySelector('.submit-button');
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      setTimeout(() => {
        alert('Thank you for your message! Our support team will respond within 24 hours.');
        supportForm.reset();
        submitButton.textContent = 'Submit Request';
        submitButton.disabled = false;
      }, 1500);
    });
  }
});

// Add CSS class for search matches
const style = document.createElement('style');
style.textContent = `
  .search-match {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3) !important;
    position: relative;
  }
  
  .search-match::before {
    content: 'Match found';
    position: absolute;
    top: -10px;
    right: 10px;
    background: #3b82f6;
    color: white;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    z-index: 10;
  }
  
  .float-1 {
    animation: float1 6s ease-in-out infinite;
  }
  
  .float-2 {
    animation: float2 7s ease-in-out infinite;
  }
  
  @keyframes float1 {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes float2 {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-7px);
    }
  }
  
  .scroll-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #7c3aed, #3b82f6);
    width: 0%;
    transition: width 0.3s ease;
  }
  
  .navbar.scrolled {
    background: rgba(0, 0, 0, 0.9);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  }
`;
document.head.appendChild(style);