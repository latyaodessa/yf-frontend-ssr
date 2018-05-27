export function login() {
	return function (dispatch) {
		dispatch({type: 'LOGIN'})
	}
}
export function logout() {
	return function (dispatch) {
		dispatch({type: 'LOGOUT'})
	}
}
