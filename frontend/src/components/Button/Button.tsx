import classes from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  };

export default function Button({children, ...props} : ButtonProps){
    return (
        <button {...props} className={classes.button}>
            {children}
        </button>
    )
}