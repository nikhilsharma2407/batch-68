export const ACTION_TYPES = {
  NAME: "name",
  EMAIL: "email",
  USERNAME: "username",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
};

const EMAIL_PATTERN = /^\w+(\.\w+)?@[a-z]{2,}\.[a-z]{2,}$/;

export const initialState = {
  name: {
    value: null,
    isValid: null,
    isDirty: false,
  },
  username: {
    value: null,
    isValid: null,
    isDirty: false,
  },
  email: {
    value: null,
    isValid: null,
    isDirty: false,
  },
  password: {
    value: null,
    isDirty: false,
    strongPwdValidation: {
      hasLowerCase: null,
      hasUpperCase: null,
      hasDigit: null,
      hasSpecialCharacter: null,
      meetsMinChRequirement: null,
    },
  },
  confirmPassword: {
    value: null,
    isValid: null,
    isSame: null,
    isDirty: false,
  },
};

// action -> {type, payload}
const signupReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.NAME:
      // update the state immutably
      const copyState = { ...state };
      copyState.name = {
        value: payload,
        isValid: payload.length > 0,
        isDirty: true,
      };
      return copyState;

    case ACTION_TYPES.EMAIL:
      return {
        ...state,
        [type]: {
          value: payload,
          isValid: payload.length > 0 && EMAIL_PATTERN.test(payload),
          isDirty: true,
        },
      };
    case ACTION_TYPES.PASSWORD:
      return {
        ...state,
        [type]: {
          value: payload,
          isValid: payload.length > 0 && EMAIL_PATTERN.test(payload),
          isDirty: true,
        },
      };
    case ACTION_TYPES.USERNAME:
    case ACTION_TYPES.CONFIRM_PASSWORD:
      return {
        ...state,
        [type]: { value: payload, isValid: payload.length > 0, isDirty: true },
      };

    default:
      return state;
  }
};

export default signupReducer;
