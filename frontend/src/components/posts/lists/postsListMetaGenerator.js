import {
    CHARSET,
    DESCRIPTION_ART_LIST,
    DESCRIPTION_NATIVE_LIST,
    DESCRIPTION_SETS_LIST,
    KEYWORDS_ART_LIST,
    KEYWORDS_NATIVE_LIST,
    KEYWORDS_SETS_LIST,
    TITLE_ART_LIST,
    TITLE_NATIVE_LIST,
    TITLE_SETS_LIST,
    TITLE_EXCLUSIVE_LIST,
    DESCRIPTION_EXCLUSIVE_LIST,
    KEYWORDS_EXCLUSIVE_LIST
} from '../../../messages/meta'

export const POST_TYPE = {NATIVE: "native", SETS: "sets", ART: "art", EXCLUSIVE: "exclusive"};

export const getMetaData = (type) => {
    switch (type) {
        case POST_TYPE.NATIVE:
            return native();
        case POST_TYPE.ART:
            return art();
        case POST_TYPE.SETS:
            return sets();
        case POST_TYPE.EXCLUSIVE:
            return exclusive();
        default:
            return native;
    }
};

const native = () => {
    return {
        title: TITLE_NATIVE_LIST,
        description: DESCRIPTION_NATIVE_LIST,
        charset: CHARSET,
        keywords: KEYWORDS_NATIVE_LIST
    }
};

const exclusive = () => {
    return {
        title: TITLE_EXCLUSIVE_LIST,
        description: DESCRIPTION_EXCLUSIVE_LIST,
        charset: CHARSET,
        keywords: KEYWORDS_EXCLUSIVE_LIST
    }
};

const sets = () => {
    return {
        title: TITLE_SETS_LIST,
        description: DESCRIPTION_SETS_LIST,
        charset: CHARSET,
        keywords: KEYWORDS_SETS_LIST
    }
};

const art = () => {
    return {
        title: TITLE_ART_LIST,
        description: DESCRIPTION_ART_LIST,
        charset: CHARSET,
        keywords: KEYWORDS_ART_LIST
    }
};

