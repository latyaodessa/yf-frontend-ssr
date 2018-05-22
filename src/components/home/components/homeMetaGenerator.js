import {CANONICIAL_HOST, CHARSET, DESCRIPTION_HOME, KEYWORDS_HOME, TITLE_HOME} from '../../../messages/meta'

export default () => {
    return {
        title: TITLE_HOME,
        description: DESCRIPTION_HOME,
        canonical: CANONICIAL_HOST,
        charset: CHARSET,
        keywords: KEYWORDS_HOME
    };
}
