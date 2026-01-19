// ===================================
// Modern Portfolio JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
	
	// ===================================
	// Navigation
	// ===================================
	
	const nav = document.getElementById('mainNav');
	const hamburger = document.querySelector('.hamburger');
	const navMenu = document.querySelector('.nav-menu');
	const navLinks = document.querySelectorAll('.nav-link');
	
	// Hamburger menu toggle
	if (hamburger) {
		hamburger.addEventListener('click', () => {
			navMenu.classList.toggle('active');
			hamburger.classList.toggle('active');
		});
	}
	
	// Close menu when clicking on a link
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			navMenu.classList.remove('active');
			hamburger.classList.remove('active');
		});
	});
	
	// Active nav link on scroll
	const sections = document.querySelectorAll('.section, .hero-section');
	
	window.addEventListener('scroll', () => {
		let current = '';
		
		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (window.pageYOffset >= sectionTop - 200) {
				current = section.getAttribute('id');
			}
		});
		
		navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === `#${current}`) {
				link.classList.add('active');
			}
		});
		
		// Nav background on scroll
		if (window.scrollY > 100) {
			nav.style.background = 'rgba(30, 41, 59, 0.95)';
		} else {
			nav.style.background = 'rgba(30, 41, 59, 0.8)';
		}
	});
	
	// ===================================
	// Typing Effect
	// ===================================
	
	const typingText = document.querySelector('.typing-text');
	const phrases = [
		'AI Expert',
		'AI Inference Acceleration',
		'Generative AI at the Edge',
		'AI Runtime Engineer',
		'System ML/AI Engineer',
		'Embedded Systems & Automotive',
		'ISO-26262 Functional Safety',
		'Deep Learning & Computer Vision'
	];
	
	let phraseIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let typingSpeed = 100;
	
	function type() {
		const currentPhrase = phrases[phraseIndex];
		
		if (isDeleting) {
			typingText.textContent = currentPhrase.substring(0, charIndex - 1);
			charIndex--;
			typingSpeed = 50;
		} else {
			typingText.textContent = currentPhrase.substring(0, charIndex + 1);
			charIndex++;
			typingSpeed = 100;
		}
		
		if (!isDeleting && charIndex === currentPhrase.length) {
			isDeleting = true;
			typingSpeed = 2000; // Pause at end
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			phraseIndex = (phraseIndex + 1) % phrases.length;
			typingSpeed = 500; // Pause before next phrase
		}
		
		setTimeout(type, typingSpeed);
	}
	
	if (typingText) {
		setTimeout(type, 1000);
	}
	
	// ===================================
	// Counter Animation
	// ===================================
	
	const counters = document.querySelectorAll('.stat-number');
	const speed = 200; // Animation speed
	
	const animateCounter = (counter) => {
		const target = +counter.getAttribute('data-target');
		const count = +counter.innerText;
		const increment = target / speed;
		
		if (count < target) {
			counter.innerText = Math.ceil(count + increment);
			setTimeout(() => animateCounter(counter), 1);
		} else {
			counter.innerText = target;
		}
	};
	
	// Intersection Observer for counters
	const counterObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const counter = entry.target;
				counter.innerText = '0';
				animateCounter(counter);
				counterObserver.unobserve(counter);
			}
		});
	}, { threshold: 0.5 });
	
	counters.forEach(counter => {
		counterObserver.observe(counter);
	});
	
	// ===================================
	// Scroll Animations
	// ===================================
	
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -100px 0px'
	};
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);
	
	// Observe elements for scroll animation
	const animateOnScroll = document.querySelectorAll('.info-card, .experience-card, .research-card, .skill-category, .contact-card, .publication-item');
	
	animateOnScroll.forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(30px)';
		el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		observer.observe(el);
	});
	
	// ===================================
	// Skill Bars Animation
	// ===================================
	
	const skillBars = document.querySelectorAll('.skill-progress');
	
	const skillObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const bar = entry.target;
				const width = bar.style.getPropertyValue('--width');
				bar.style.width = width;
				skillObserver.unobserve(bar);
			}
		});
	}, { threshold: 0.5 });
	
	skillBars.forEach(bar => {
		skillObserver.observe(bar);
	});
	
	// ===================================
	// Timeline Animation
	// ===================================
	
	const timelineItems = document.querySelectorAll('.timeline-item');
	
	const timelineObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				timelineObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.3 });
	
	timelineItems.forEach(item => {
		timelineObserver.observe(item);
	});
	
	// ===================================
	// Smooth Scroll
	// ===================================
	
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			
			if (target) {
				const offsetTop = target.offsetTop - 100;
				window.scrollTo({
					top: offsetTop,
					behavior: 'smooth'
				});
			}
		});
	});
	
	// ===================================
	// Parallax Effect for Background Orbs
	// ===================================
	
	const orbs = document.querySelectorAll('.gradient-orb');
	
	window.addEventListener('scroll', () => {
		const scrolled = window.pageYOffset;
		
		orbs.forEach((orb, index) => {
			const speed = 0.5 + (index * 0.2);
			orb.style.transform = `translateY(${scrolled * speed}px)`;
		});
	});
	
	// ===================================
	// Mouse Move Effect on Cards
	// ===================================
	
	const cards = document.querySelectorAll('.experience-card, .research-card, .info-card');
	
	cards.forEach(card => {
		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			
			const rotateX = (y - centerY) / 20;
			const rotateY = (centerX - x) / 20;
			
			card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
		});
		
		card.addEventListener('mouseleave', () => {
			card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
		});
	});
	
	// ===================================
	// Cursor Trail Effect
	// ===================================
	
	const createCursorTrail = () => {
		const trail = document.createElement('div');
		trail.className = 'cursor-trail';
		trail.style.cssText = `
			position: fixed;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			pointer-events: none;
			z-index: 9999;
			opacity: 0.6;
			transition: opacity 0.3s ease;
		`;
		document.body.appendChild(trail);
		
		return trail;
	};
	
	const trails = [];
	const maxTrails = 10;
	
	for (let i = 0; i < maxTrails; i++) {
		trails.push(createCursorTrail());
	}
	
	let mouseX = 0;
	let mouseY = 0;
	let currentTrail = 0;
	
	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});
	
	setInterval(() => {
		trails[currentTrail].style.left = mouseX + 'px';
		trails[currentTrail].style.top = mouseY + 'px';
		trails[currentTrail].style.opacity = '0.6';
		
		setTimeout(() => {
			trails[currentTrail].style.opacity = '0';
		}, 100);
		
		currentTrail = (currentTrail + 1) % maxTrails;
	}, 50);
	
	// ===================================
	// Loading Animation
	// ===================================
	
	window.addEventListener('load', () => {
		document.body.style.opacity = '0';
		setTimeout(() => {
			document.body.style.transition = 'opacity 0.5s ease';
			document.body.style.opacity = '1';
		}, 100);
	});
	
	// ===================================
	// Scroll Progress Indicator
	// ===================================
	
	const createScrollProgress = () => {
		const progressBar = document.createElement('div');
		progressBar.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			height: 4px;
			background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
			z-index: 10000;
			transition: width 0.1s ease;
		`;
		document.body.appendChild(progressBar);
		
		window.addEventListener('scroll', () => {
			const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const scrolled = (window.pageYOffset / windowHeight) * 100;
			progressBar.style.width = scrolled + '%';
		});
	};
	
	createScrollProgress();
	
	// ===================================
	// Floating Icons Animation
	// ===================================
	
	const floatingIcons = document.querySelectorAll('.icon-item');
	
	floatingIcons.forEach((icon, index) => {
		icon.style.animationDelay = `${index * 0.5}s`;
	});
	
	// ===================================
	// Dynamic Gradient Background
	// ===================================
	
	let hue = 0;
	
	setInterval(() => {
		hue = (hue + 1) % 360;
		document.documentElement.style.setProperty('--dynamic-hue', hue);
	}, 50);
	
	// ===================================
	// Button Ripple Effect
	// ===================================
	
	const buttons = document.querySelectorAll('.btn, .social-link, .quick-link');
	
	buttons.forEach(button => {
		button.addEventListener('click', function(e) {
			const ripple = document.createElement('span');
			const rect = this.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;
			
			ripple.style.cssText = `
				position: absolute;
				width: ${size}px;
				height: ${size}px;
				border-radius: 50%;
				background: rgba(255, 255, 255, 0.5);
				left: ${x}px;
				top: ${y}px;
				pointer-events: none;
				animation: ripple 0.6s ease-out;
			`;
			
			this.style.position = 'relative';
			this.style.overflow = 'hidden';
			this.appendChild(ripple);
			
			setTimeout(() => ripple.remove(), 600);
		});
	});
	
	// Add ripple animation to CSS
	const style = document.createElement('style');
	style.textContent = `
		@keyframes ripple {
			from {
				transform: scale(0);
				opacity: 1;
			}
			to {
				transform: scale(4);
				opacity: 0;
			}
		}
	`;
	document.head.appendChild(style);
	
	// ===================================
	// Lazy Loading Images
	// ===================================
	
	const images = document.querySelectorAll('img[data-src]');
	
	const imageObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.removeAttribute('data-src');
				imageObserver.unobserve(img);
			}
		});
	});
	
	images.forEach(img => imageObserver.observe(img));
	
	// ===================================
	// Scroll to Top Button
	// ===================================
	
	const createScrollToTop = () => {
		const button = document.createElement('button');
		button.innerHTML = '<i class="fas fa-arrow-up"></i>';
		button.style.cssText = `
			position: fixed;
			bottom: 2rem;
			right: 2rem;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			border: none;
			cursor: pointer;
			display: none;
			align-items: center;
			justify-content: center;
			font-size: 1.2rem;
			z-index: 1000;
			box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
			transition: all 0.3s ease;
		`;
		
		button.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
		
		button.addEventListener('mouseenter', () => {
			button.style.transform = 'scale(1.1) translateY(-5px)';
			button.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
		});
		
		button.addEventListener('mouseleave', () => {
			button.style.transform = 'scale(1) translateY(0)';
			button.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
		});
		
		window.addEventListener('scroll', () => {
			if (window.pageYOffset > 300) {
				button.style.display = 'flex';
			} else {
				button.style.display = 'none';
			}
		});
		
		document.body.appendChild(button);
	};
	
	createScrollToTop();
	
	// ===================================
	// Console Message
	// ===================================
	
	console.log('%c👋 Welcome to Kamal Lamichhane\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
	console.log('%c🚀 Built with modern web technologies', 'color: #14b8a6; font-size: 14px;');
	console.log('%c💼 Looking for collaboration? Let\'s connect!', 'color: #ec4899; font-size: 14px;');
	
	// ===================================
	// Performance Monitoring
	// ===================================
	
	if ('performance' in window) {
		window.addEventListener('load', () => {
			const perfData = performance.timing;
			const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
			console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
		});
	}
	
});
