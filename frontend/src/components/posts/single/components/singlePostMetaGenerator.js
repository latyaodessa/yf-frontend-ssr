import {
    BRAND,
    CANONICIAL_HOST,
    CHARSET,
    DESCRIPTION_SINGLE,
    KEYWORDS_SINGLE,
    MODEL,
    PHOTOGRAPHER
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
        return [MODEL, post.mdSimple, PHOTOGRAPHER, post.phSimple, "-", BRAND].join(" ");
    }
}

function getCanonical(post) {
    if (post) {
        return CANONICIAL_HOST + post.link
    }
}

function getKeywords(post) {
    if (post) {
        return [post.mdSimple, post.phSimple].concat(KEYWORDS_SINGLE).join(", ")
    }
}
