interface IButton {
  title?: string;
  name?: string;
  loadingTitle?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  loading?: boolean;
  position?: string;
  type?: "submit" | "button" | "reset";
  customClass?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export default function Button({
  title,
  name,
  loadingTitle = "Loading...",
  onClick = () => {},
  disabled = false,
  loading = false,
  type = "submit",
  position = "text-right",
  children,
  customClass = "",
  variant = "primary",
  iconLeft = <></>,
  iconRight = <></>,
}: IButton) {
  return (
    <div className={position}>
      <button
        className={`${variant === "primary" ? "text-white" : "text-black"} 
                    transition 
                    ${variant === "primary" ? "bg-regularAccent" : ""} 
                    ${variant === "secondary" ? "bg-slate-200" : ""} 
                    focus:ring-4 
                    focus:ring-cyan-200 capitalize
                    font-semibold rounded-md text-sm/6 text-center 
                    ${loading ? "animate-pulse" : ""} 
                    leading-none 
                    px-5 
                    py-2.5 
                    hover:opacity-80 
                    ${customClass}`}
        name={name}
        type={type}
        disabled={loading || disabled}
        onClick={onClick}
      >
        {iconLeft}
        {loading ? loadingTitle + "..." : ""}
        {!loading && typeof title !== "undefined" && title !== null
          ? title
          : children}
        {iconRight}
      </button>
    </div>
  );
}
