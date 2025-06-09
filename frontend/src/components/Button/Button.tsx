import classes from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode,
    variant?: 'primary' | 'secondary' | 'danger' | 'next-button' | string;
};

export default function Button({children, variant  = 'primary', className,  ...props} : ButtonProps){
    const buttonClasses = `${classes.button} ${classes[variant]} ${className || ''}`.trim();

    return (
        <button {...props} className={buttonClasses}>
            {children}
        </button>
    )
}