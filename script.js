// Elite Elevators - Custom JavaScript

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
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").substring(1) === current) {
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
      const navbarHeight = document.querySelector(".navbar").offsetHeight
      const targetPosition = target.offsetTop - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Close mobile menu after clicking
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show") && window.bootstrap) {
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    }
  })
})

// Fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(20px)"
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(element)
})

// Service cards hover effect enhancement
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.borderColor = "var(--light-gold)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.borderColor = "var(--gold)"
  })
})

// WhatsApp button pulse animation enhancement
const whatsappBtn = document.querySelector(".whatsapp-float")
if (whatsappBtn) {
  setInterval(() => {
    whatsappBtn.style.transform = "scale(1.1)"
    setTimeout(() => {
      whatsappBtn.style.transform = "scale(1)"
    }, 200)
  }, 3000)
}

// Form validation (if you add a contact form later)
function validateForm(formId) {
  const form = document.getElementById(formId)
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Add your validation logic here
      const inputs = form.querySelectorAll("input, textarea")
      let isValid = true

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.style.borderColor = "red"
        } else {
          input.style.borderColor = "var(--gold)"
        }
      })

      if (isValid) {
        // Submit form or show success message
        alert("Thank you for your message! We will contact you soon.")
        form.reset()
      }
    })
  }
}

// Initialize tooltips (Bootstrap feature)
if (window.bootstrap) {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl))
}

// Preload images for better performance
window.addEventListener("load", () => {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded")
    } else {
      img.addEventListener("load", function () {
        this.classList.add("loaded")
      })
    }
  })
})

// Mobile menu close on outside click
document.addEventListener("click", (event) => {
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (!navbarToggler.contains(event.target) && !navbarCollapse.contains(event.target)) {
    if (navbarCollapse.classList.contains("show") && window.bootstrap) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      })
      bsCollapse.hide()
    }
  }
})

// Performance: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout
  return function () {
    const args = arguments
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  }
}

// Apply debounce to scroll handler
window.addEventListener(
  "scroll",
  debounce(() => {
    // Your scroll logic here if needed
  }, 15),
)

console.log("Elite Elevators - Website loaded successfully!")

// Contact form submission
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const phone = document.getElementById("phone").value
    const email = document.getElementById("email").value
    const service = document.getElementById("service").value
    const message = document.getElementById("message").value

    // Create WhatsApp message
    const whatsappMessage = `السلام عليكم،
        
الاسم: ${name}
رقم الجوال: ${phone}
البريد الإلكتروني: ${email}
نوع الخدمة: ${service}

الرسالة:
${message}`

    const whatsappNumber = "201066203571" // Replace with actual number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    // Reset form
    contactForm.reset()

    // Show success message
    alert("شكراً لتواصلك معنا! سيتم فتح واتساب الآن لإرسال رسالتك.")
  })
}