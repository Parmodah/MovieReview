export const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="dark:text-dark-subtle text-light-subtle font-semibold"
    >
      {children}
    </label>
  );
};

export const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
  const renderBadge = () => {
    if (!badge) return null;

    return (
      <span className="dark:bg-dark-subtle bg-light-subtle absolute top-0 right-0 translate-x-3 -translate-y-1 text-xs w-5 h-5 rounded-full flex justify-center items-center">
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };

  return (
    <div className="relative">
      <Label htmlFor={htmlFor}>{children}</Label>
      {renderBadge()}
    </div>
  );
};
