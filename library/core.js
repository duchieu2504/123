export default function html([first, ...strings], ...values) {  // Template string
    // first: <ul>
    // ...strings: </ul> <button onclick="dispatch('ADD', 'Porsche')">Add car</button>
    // ...values: cars.map(car => ) => mảng gồm các thẻ <li>${car}</li>
    return values.reduce( 
        (acc, cur) => acc.concat(cur, strings.shift()), // nối mảng
     [first])
     .filter(x => x && x !== true || x === 0 )  // Loại bỏ những phàn tử falsy và true chỉ lấy phần tử trusy nhưng loại bỏ true và lấy số 0 
     .join('')
}

export function createStore(reducer) {
    let state = reducer()  // dữ liệu trong store gọi là state -- trạng thái
    const roots = new Map()  // roots chứa các element để render ra view
                    // new Map() có thể lọc qua nó, có thể đặt bất cứ kiểu key j trong js
    function render() {  // lọc qua root để render ra view
        for (const [root, component] of roots) { //component là thành phần chứa view, gán
            const output = component() // lấy html,component là hàm để in ra html
            root.innerHTML = output
        }
    }

    return {
        // attach: nhận view để đẩy ra root
        attach(component, root) {  
            roots.set(root, component) // root: key; component : value => roots = {root: component}
            render()
        },
        // connect: kết nối view với store - đẩy dữ liệu từ store ra view
        connect(selector = state => state) { 
            return component => (props, ...args) =>   // props: là công cụ dữ liệu truyền vào component trong react
                component(Object.assign({}, props, selector(state), ...args)) // object.assign({}, ) => tạo bản sao object
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args)  // lấy state trước làm đối số ban đầu truyền vào và tạo ra state mới và object cars mới
            render()
        }
    }
}