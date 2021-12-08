window.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.banner')
  const imgs = banner.querySelectorAll('[data-active]')
  imgs.forEach(img => {
    img.addEventListener('click', event => {
      const active = (event.target).closest('[data-active]')

      if (active.dataset.active === 'true') return

      const cls = active.className
      banner.className = `banner ${cls}-active`

      imgs.forEach(img => img.dataset.active = false)
      img.dataset.active = true
    })
  })
})
