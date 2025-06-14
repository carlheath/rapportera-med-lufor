
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <header className="bg-background/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-64">
          <Link to="/" className="flex items-center space-x-4">
            <img src="/lovable-uploads/a191fb6a-8c5f-4f9b-b6ab-c3a26a5d008f.png" alt={t('header.logoAlt')} className="h-60" />
          </Link>
          <div>{children}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
