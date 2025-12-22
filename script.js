/* global bootstrap */

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("mainNav")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Active nav link on scroll
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    }
  })
})

// Scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".service-card, .feature-card, .accordion-item, .installation-item, .maintenance-item, .hero-content, .hero-image, .about-content, .about-image",
  )

  animateElements.forEach((el) => {
    observer.observe(el)
  })
})

// Contact form submission
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const phone = document.getElementById("phone").value
    const email = document.getElementById("email").value
    const service = document.getElementById("service").value
    const message = document.getElementById("message").value

    // Create WhatsApp message
    const whatsappMessage = `مرحباً، أنا ${name}%0A
الهاتف: ${phone}%0A
البريد: ${email}%0A
الخدمة المطلوبة: ${service}%0A
الرسالة: ${message}`

    // Replace with your WhatsApp number
    const whatsappNumber = "966500000000"
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    // Open WhatsApp
    window.open(whatsappURL, "_blank")

    // Reset form
    contactForm.reset()
  })
}

// Add loading class removal on page load
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})
