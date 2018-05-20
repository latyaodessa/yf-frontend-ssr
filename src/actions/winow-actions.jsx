export function resizeWindow() {
	return function (dispatch) {
				dispatch({type: 'RESIZE', payload: window.innerWidth})
	}
}
