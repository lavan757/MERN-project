export const VALIDATION_PATTERN = {
    EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
    PHONE: /^\d{10}$/,
  };

export const RequestStatus = {
    NotStarted: 'NotStarted',
    InProgress: 'InProgress',
    Success: 'Success',
    Failure: 'Failure',
    Deleted: 'Deleted',
}