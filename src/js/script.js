window.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.banner')
  const imgs = banner.querySelectorAll('[data-active]')
  imgs.forEach(img => {
    img.addEventListener('click', event => {
      const target = (event.target).closest('[data-active]')

      if (target.dataset.active === 'true') {
        imgs.forEach(img => img.dataset.active = false)
        banner.className = `banner`
      } else {
        banner.className = `banner ${target.className}-active`
        imgs.forEach(img => img.dataset.active = false)
        img.dataset.active = true
      }
    })
  })
})
