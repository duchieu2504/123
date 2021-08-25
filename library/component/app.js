import html from '../core.js'
import {connect} from '../store.js'

const connector = connect ()

function App({cars}) { //args => {cars}
    
    return html `
        <ul>
            ${cars.map(car => `<li>${car}</li>`)}
        </ul>
        <button onclick="dispatch('ADD', 'Porsche')">Add car</button>
    `
}
console.log(connector(App))


/* 
function connector(component) {
    (props, ...args) =>   component(Object.assign({}, props, selector(state), ...args))   
}

// component ~~~ App
*/

console.log(connector(App)())
// chạy hàm connector(App) mà khi này component(Object.assign({}, props, selector(state), ...args)) = App(Object.assign({}, props, selector(state), ...args))
// connector(App)() nghĩa là gọi lại hàm App()

export default connector(App)