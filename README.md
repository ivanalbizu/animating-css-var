## Arrancar proyecto con ParcelJS

Sobre la raiz del proyecto, con ParcelJS instalado (Yo tengo instalada la versión 1.12.5)

```bash
parcel index.html
```

En la entrada anterior, <a href="https://ivanalbizu.eu/blog/animating-css-vars">Clip-path banner con dat.GUI para debug</a>, definía puntos en sistema de coordenadas mediante variables CSS que asignaba a la propiedad <code>clip-path</code>. En esta entrada quería jugar un poco con eso, para añadirle un poco de gracia y que el cambio de valores tuviera un poco de animación. La solución no es compatible (animación) para Safari y Firefox

## Registro de variables CSS

Necesitamos decirle al navegador que variables CSS hemos creado, para que pueda interpretarla en las animaciones o transiciones. Esta definición es necesaria si queremos aplicar transiciones o animaciones

<ul>
  <li><code>initial-value:</code>: valor inicial</li>
  <li><code>inherits:</code>: si se puede heredar. Le pasamos <code>true</code></li>
  <li><code>syntax</code>: le pasamos <code>'&lt;percentage&gt;'</li>
</ul>

```css
@property --pi-1-x {
  initial-value: 50%;
  inherits: true;
  syntax: '<percentage>';
}
@property --pi-2-x {
  initial-value: 80%;
  inherits: true;
  syntax: '<percentage>';
}
@property --pi-3-x {
  initial-value: 52%;
  inherits: true;
  syntax: '<percentage>';
}
@property --pi-4-x {
  initial-value: 22%;
  inherits: true;
  syntax: '<percentage>';
}
```

## Nuevos valores para las variables CSS

En principio no sería necesario definirlo si fuera el mismo valor, pero dado que firefox y safari no lo reconocen, se hace necesario

Importante es que al especificar la <code>transition</code> no usemos la palabra clave <code>all</code> ya que no aplica la transición, es necesario especificar que variables serán las animadas

Definimos "tres estados", uno para cada una de las tres imágenes

```scss
.banner {
  --pe-1: 0% 0%;
  --pe-2: 100% 0%;
  --pe-3: 100% 100%;
  --pe-4: 0% 100%;
  --g: 10px;
  --gutter: calc(var(--g) / 2);
  --pi-1-x: 36%;
  --pi-2-x: 80%;
  --pi-3-x: 52%;
  --pi-4-x: 22%;
  --pi-1-y: 0%;
  --pi-2-y: 0%;
  --pi-3-y: 100%;
  --pi-4-y: 100%;

  transition: 
    --pi-1-x .5s ease-in-out,
    --pi-2-x .5s ease-in-out,
    --pi-3-x .5s ease-in-out,
    --pi-4-x .5s ease-in-out;

  &.left-active {
    --pi-1-x: 82%;
    --pi-2-x: 93%;
    --pi-3-x: 90%;
    --pi-4-x: 80%;
  }
  &.center-active {
    --pi-1-x: 12%;
    --pi-2-x: 92%;
    --pi-3-x: 89%;
    --pi-4-x: 7%;
  }
  &.right-active {
    --pi-1-x: 10%;
    --pi-2-x: 20%;
    --pi-3-x: 16%;
    --pi-4-x: 8%;
  }
}
```

## Tratar estados con javascript

La parte de <code>javascript</code> es sencilla. Consiste en añadir clases que indiquen que imagen está activa y aplicar los estilos CSS 

```javascript
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
```
