import { TLayout } from "@/modules/types";

const AuthFormLayout: React.FC<TLayout> = ({ children }) => {
    return ( 
        <div className="p-7 flex flex-col items-center space-y-5 border border-slate-300 rounded-md max-w-md">
            {children}
        </div>
     );
}
 
export default AuthFormLayout;