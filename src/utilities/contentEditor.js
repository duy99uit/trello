export const saveContentAfterEnterPressed = (e) => {
  if (e.key === "Enter") {
    e.target.preventDefault;
    e.target.blur();
  }
};

export const selectAllInlineText = (e) => {
  e.target.focus();
  e.target.select();
};
