export default function createStore(initialState, registrar) {
  return (state = initialState, action, handlers = registrar(state, action)) =>
    handlers[action.type] ? handlers[action.type]() : state
}

