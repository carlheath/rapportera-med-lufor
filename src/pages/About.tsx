
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header>
        <Button asChild variant="outline">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Link>
        </Button>
      </Header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{t('aboutPage.title')}</h1>
          <p className="text-lg text-muted-foreground mb-6">
            {t('aboutPage.subtitle')}
          </p>
          <div className="space-y-4 text-foreground/90">
            <p>
              {t('aboutPage.p1')}
            </p>
            <p>
              {t('aboutPage.p2')}
            </p>
            <p>{t('aboutPage.p3')}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
