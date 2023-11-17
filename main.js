import './style.css'
import './node_modules/modern-css-reset/dist/reset.min.css'

import { run } from './src/slides.js'

document.querySelector('#app').innerHTML = `

`

run(document.querySelector('#app'))
