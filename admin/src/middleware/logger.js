const logger = ({getState, dispatch}) => next => action => {
        console.log(action);
};

export default logger;
