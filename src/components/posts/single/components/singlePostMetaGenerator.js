import {
    CANONICIAL_HOST,
    MODEL,
    PHOTOGRAPHER,
    BRAND,
    KEYWORDS_SINGLE,
    DESCRIPTION_SINGLE,
    CHARSET
} from '../../../../messages/meta'

export default (post) => {
    return {
        title: getTitle(post),
        description: getTitle(post) + " " + DESCRIPTION_SINGLE,
        canonical: getCanonical(),
        charset: CHARSET,
        keywords: getKeywords()
    };
}


function getTitle(post) {
    if (post) {
        return [MODEL, post.md, PHOTOGRAPHER, post.ph, "-", BRAND].join(" ");
    }
}

function getCanonical(post) {
    if (post) {
        return CANONICIAL_HOST + post.id
    }
}

function getKeywords(post) {
    if (post) {
        return [post.md, post.ph].concat(KEYWORDS_SINGLE).join(", ")
    }
}
