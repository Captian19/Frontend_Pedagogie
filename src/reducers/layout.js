const initialState = {
    sidebarShow: 'responsive'
  }
  
export default function layout(state = initialState, { type, ...rest }) {
    switch (type) {
        case 'set':
        return {...state, ...rest }
        default:
        return state
    }
}
