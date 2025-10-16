// CAROUSEL TYPE 1: Set-based (moves 3 images at a time)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project__carousel .slider").forEach(slider => {
    const originalImages = Array.from(slider.querySelectorAll(".slider__img"))
    
    originalImages.forEach(img => {
      slider.appendChild(img.cloneNode(true))
    })
    
    slider.style.setProperty("--slider-index", 0)
  })
})

// CAROUSEL TYPE 2: Single image (center-focused, moves 1 at a time)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".coverages__carousel .slider").forEach(slider => {
    const originalImages = Array.from(slider.querySelectorAll(".slider__img"))
    
    originalImages.forEach(img => {
      slider.appendChild(img.cloneNode(true))
    })
    
    slider.style.setProperty("--slider-index", 1)
    updateActiveImage(slider, 1)
  })
})

function updateActiveImage(slider, index) {
  const images = slider.querySelectorAll(".slider__img")
  images.forEach(img => img.classList.remove("activeSlide"))
  if (images[index]) {
    images[index].classList.add("activeSlide")
  }
}

document.addEventListener("click", e => {
  let arrow
  if (e.target.matches(".arrow")) {
    arrow = e.target
  } else {
    arrow = e.target.closest(".arrow")
  }
  if (arrow != null) onArrowClick(arrow)
})

function onArrowClick(arrow) {
  const container = arrow.closest(".project__carousel, .coverages__carousel")
  const slider = container.querySelector(".slider")
  let sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  )
  const totalImages = slider.children.length
  const originalCount = totalImages / 2
  
  const isSetCarousel = container.classList.contains("project__carousel")
  const itemsPerScreen = 3
  const maxSets = Math.ceil(originalCount / itemsPerScreen)

  if (arrow.classList.contains("arrow--left")) {
    sliderIndex--
  } else if (arrow.classList.contains("arrow--right")) {
    sliderIndex++
  }

  slider.style.setProperty("--slider-index", sliderIndex)

  if (!isSetCarousel) {
    updateActiveImage(slider, sliderIndex)
  }

  slider.addEventListener("transitionend", function reset() {
    if (isSetCarousel) {
      if (sliderIndex >= maxSets) {
        slider.style.transition = "none"
        slider.style.setProperty("--slider-index", 0)
        setTimeout(() => {
          slider.style.transition = "transform 250ms ease-in-out"
        }, 20)
      } else if (sliderIndex < 0) {
        slider.style.transition = "none"
        slider.style.setProperty("--slider-index", maxSets - 1)
        setTimeout(() => {
          slider.style.transition = "transform 250ms ease-in-out"
        }, 20)
      }
    } else {
      if (sliderIndex >= originalCount + 1) {
        slider.style.transition = "none"
        slider.style.setProperty("--slider-index", 1)
        updateActiveImage(slider, 1)
        setTimeout(() => {
          slider.style.transition = "transform 250ms ease-in-out"
        }, 20)
      } else if (sliderIndex < 1) {
        slider.style.transition = "none"
        slider.style.setProperty("--slider-index", originalCount)
        updateActiveImage(slider, originalCount)
        setTimeout(() => {
          slider.style.transition = "transform 250ms ease-in-out"
        }, 20)
      }
    }
    slider.removeEventListener("transitionend", reset)
  })
}