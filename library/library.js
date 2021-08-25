// import html from './core.js'

// const cars = ['BMW', 'Mercedes','KIA']

// const isSuccess = false

// const ouput =html`
//     <h1>${true}</h1>
//     <ul>
//         ${cars.map(car => `<li>${car}</li>`)}
//     </ul>
// `

// console.log(ouput)

import { attach } from './store.js'
import App from './component/app.js'
// App = connector(App) vì export default


(App, document.getElementById('root')) // App(): component()