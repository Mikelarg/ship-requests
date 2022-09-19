export const cn = (...args) => args.filter(Boolean).join(" ");
export const isEmpty = (obj) => Object.keys(obj).length === 0;
