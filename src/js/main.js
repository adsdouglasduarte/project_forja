document.addEventListener('DOMContentLoaded', () => {
  AOS.init()
  

  const imagens = document.querySelectorAll('.box__carousel .carousel-item img')

  imagens.forEach(img => {
    img.addEventListener('click', () => {
      const slide = img.closest('.carousel-item')

      // Alterna a classe 'show-caption' no slide atual
      slide.classList.toggle('show-caption')

      // Remove 'show-caption' dos outros slides
      imagens.forEach(outraImg => {
        const outroSlide = outraImg.closest('.carousel-item')
        if (outroSlide !== slide) {
          outroSlide.classList.remove('show-caption')
        }
      })
    })
  })
})
