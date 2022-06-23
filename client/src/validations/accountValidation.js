export const passwordRequirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
  { re: /[^\s]/, label: "No whitespace" },
];

export const usernameRequirements = [
  { re: /[^$&+,:;=?@#|'<>.^*()%!-]/, label: "No special symbol" },
  { re: /[^\s]/, label: "No whitespace" },
];

export const emailRequirements = [
    { re: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, label: "Email is in correct format" },
    { re: /^[^.]|[^.]+|[^.]$/, label: "Not the first, last character and after the other" },
    { re: /[^\s]/, label: "No whitespace" },
  ];
