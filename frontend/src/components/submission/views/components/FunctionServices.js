export const generateEmptyObject = (number) => ({
    number: number,
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    instagram: '',
    vk: '',
    facebook: '',
    me: false
});


export const getNewNumber = (array) => {
    if (array.length === 0) {
        return 0;
    }
    return Math.max.apply(Math, array.map((p) => p.number)) + 1;
};

