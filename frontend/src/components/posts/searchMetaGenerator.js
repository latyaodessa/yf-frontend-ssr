import {BRAND, CHARSET, DESCRIPTION_SEARCH, KEYWORDS_SEARCH} from '../../messages/meta'

export default (searchQuery) => {
    return {
        title: searchQuery + " " + BRAND,
        description: searchQuery + " " + DESCRIPTION_SEARCH,
        charset: CHARSET,
        keywords: KEYWORDS_SEARCH
    };
}

