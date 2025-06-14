
import { Link } from 'react-router-dom';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="bg-background/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-12">
          <Link to="/" className="flex items-center space-x-4">
            <img src="/lovable-uploads/47629e42-bdd2-41eb-842a-af4c4f74bba2.png" alt="LUFOR-logotyp" className="h-10" />
          </Link>
          <div>{children}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
