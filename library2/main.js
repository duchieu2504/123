
const init = {
    cars: ["BMW"]
}
function reducer(state = init, action, args) {
    switch(action){
        case('Add'):
            const newCar = [args]
            return {
                ...state,
                cars: [...state.cars, newCar]
            }
            break
        default:
            return state
    }  
}
function html([first, ...strings], ...values) {
    return values.reduce((acc, cur) => 
        acc.concat(cur, strings.shift()), 
    [first]).filter(x => x && x !== true || x === 0)
    .join('')
}

function createStore(reducer) {
    let state = reducer()
    const roots = new Map()
    function render() {
        for(const [root, component] of roots) {
            const output = component()
            root.innerHTML = output
        }
    }
    return {
        attach(component, root) {
            roots.set(root, component)
            render()
        },
        connect(selector = state => state) {
            return component => (props, ...args) =>
                component(Object.assign({}, props, selector(state), ...args))
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args)
            render()
        }
    }
}


const {attach, connect, dispatch} = createStore(reducer)
window.dispatch = dispatch

const connector = connect()
function App({ cars }) {
    return html `
        <ul>
            ${cars.map(car => `<li>${car}</li>`)}
        </ul>
        <button onclick="dispatch('Add', 'Porsche')">Add car</button>
    `
}
connector(App)

attach(connector(App), document.querySelector('#root'))