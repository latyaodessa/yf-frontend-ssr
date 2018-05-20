export default function reducer (state =
																{
																	isLogin:"",
																	executed:false
																}
	, action) {

	switch (action.type) {
		case 'LOGIN': {
			return {
				...state,
				isLogin: true,
				executed: true
			}
		}
		case 'LOGOUT': {
			return {
				...state,
				isLogin: false,
				executed: true
			}
		}
		default: {
			return {...state}
		}
	}
}
