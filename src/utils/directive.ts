const directive = (app: any) => {
  app.directive('wave', {
    mounted(e: any) {
      e.addEventListener('click', ($el: any) => {
        const X = $el.layerX
        const Y = $el.layerY

        const div = document.createElement('div')
        const h = e.clientHeight
        e.appendChild(div)
        div.className = 'v-wave-show'
        div.style.width = `${h}px`
        div.style.height = `${h}px`
        div.style.transform = `translate(${X - h / 2}px,${Y - h / 2
          }px)`

        div.classList.add('v-wave-enter')
        setTimeout(() => {
          div.style.transform = `translate(${X - h / 2}px,${Y - h / 2
            }px) scale(20)`
          div.style.opacity = '0'

          setTimeout(() => {
            div && e.removeChild(div)
          }, 800)
        }, 0)
      })

    }
  })
}

export default directive