import {
  JOYFUL,
  RELAXED,
  CONTENT,
  ADVENTUROUS,
  APPRECIATIVE,
  DETERMINED,
  BRAVE,
  AFFECTIONATE,
  CARING,
  FULFILLED,
  INTERESTED,
  BORED,
  ANGRY,
  ANNOYED,
  STRESSED,
  SAD,
  DEPRESSED,
  CONFUSED,
  ANXIOUS,
  HOBBY,
  LEISURE,
  SELF_CARE,
  SELF_REFLECTION,
  FAMILY,
  FRIENDS,
  SPORT,
  TRAVEL,
  STUDY,
  COOK,
  SHOPPING,
  WORK,
  CHORES,
  SURVIVE,
  EXERCISE,
} from '../constants/entryOptions';

export const getEntryOptionsIcon = (name) => {
  switch (name) {
    case JOYFUL:
      return 'fi fi-ts-laugh-squint';
    case RELAXED:
      return 'fi fi-ts-face-sunglasses';
    case CONTENT:
      return 'fi fi-tr-meh-blank';
    case ADVENTUROUS:
      return 'fi fi-ts-face-cowboy-hat';
    case APPRECIATIVE:
      return 'fi fi-tr-face-smile-halo';
    case DETERMINED:
      return 'fi fi-ts-face-nose-steam';
    case BRAVE:
      return 'fi fi-ts-face-smile-horns';
    case AFFECTIONATE:
      return 'fi fi-ts-face-smiling-hands';
    case CARING:
      return 'fi fi-ts-face-smile-hearts';
    case FULFILLED:
      return 'fi fi-ts-face-relieved';
    case INTERESTED:
      return 'fi fi-ts-face-thinking';
    case BORED:
      return 'fi fi-tr-face-expressionless';
    case ANGRY:
      return 'fi fi-ts-angry';
    case SAD:
      return 'fi fi-tr-sad-tear';
    case ANNOYED:
      return 'fi fi-ts-face-unamused';
    case STRESSED:
      return 'fi fi-ts-face-sad-sweat';
    case DEPRESSED:
      return 'fi fi-ts-face-disappointed';
    case CONFUSED:
      return 'fi fi-ts-face-raised-eyebrow';
    case ANXIOUS:
      return 'fi fi-ts-face-anxious-sweat';
    case HOBBY:
      return 'fi fi-ts-puzzle-alt';
    case LEISURE:
      return 'fi fi-ts-couch';
    case SELF_CARE:
      return 'fi fi-ts-hr-person';
    case SELF_REFLECTION:
      return 'fi fi-ts-member-search';
    case FAMILY:
      return 'fi fi-ts-family-pants';
    case FRIENDS:
      return 'fi fi-tr-meeting-alt';
    case SPORT:
      return 'fi fi-ts-court-sport';
    case EXERCISE:
      return 'fi fi-ts-gym';
    case TRAVEL:
      return 'fi fi-tr-shipping-fast';
    case STUDY:
      return 'fi fi-ts-book-open-cover';
    case COOK:
      return 'fi fi-ts-user-chef';
    case SHOPPING:
      return 'fi fi-ts-basket-shopping-minus';
    case WORK:
      return 'fi fi-tr-corporate-alt';
    case CHORES:
      return 'fi fi-ts-vacuum';
    case SURVIVE:
      return 'fi fi-tr-leader';
    default:
      return 'fi fi-tr-question';
  }
};

export const getSentimentIconClass = (sentiment) => {
  switch (sentiment) {
    case 1:
      return 'fi fi-ts-face-eyes-xmarks';
    case 2:
      return 'fi fi-tr-frown';
    case 3:
      return 'fi fi-ts-sad';
    case 4:
      return 'fi fi-ts-face-confused';
    case 5:
      return 'fi fi-tr-meh';
    case 6:
      return 'fi fi-tr-smile';
    case 7:
      return 'fi fi-ts-smile-beam';
    case 8:
      return 'fi fi-ts-grin-beam';
    case 9:
      return 'fi fi-tr-face-awesome';
    default:
      return 'fi fi-tr-question';
  }
};

export const getGenericIconClass = (name) => {
  switch (name) {
    case 'plus':
      return 'fi fi-br-plus';
    case 'pen':
      return 'i fi-tr-attribution-pen';
    case 'search':
      return 'fi fi-tr-insight-head';
    case 'error':
      return 'fi fi-ts-not-found'
    default:
      return 'fi fi-tr-question';
  }
};
