const select_styles = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #ccc",
    boxShadow: state.isFocused ? "0 0 0 2px #007bff" : null,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? $base_color : null,
    color: state.isSelected ? $dark_magenta : "#333",
  }),
};

export default select_styles;
