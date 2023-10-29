import { State } from "@/global/Types";
import { useSelector } from "react-redux";
import Header from "./header/Header";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const islit = useSelector((state: State) => state.themes.value);

    return (
        <div className={islit ? 'min-h-screen' : 'min-h-screen dark'}>
            <Header />
            {children}
        </div>
    )
}
export default Layout