const init = {
    cars: ['BMW']
}

export default function reducer(state = init, action, args) {
    // console.log(action, args)
    switch (action) {
        case 'ADD':
            const [newCar] = args
            console.log({
                ...state,
                cars: [...state.cars, newCar]
            })
            return {
                ...state,
                cars: [...state.cars, newCar]
            }
            break
        default:
            return state
    }
}
console.log(reducer(init, 'ADD', "KIA"))