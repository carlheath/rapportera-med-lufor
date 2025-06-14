
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-background/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="outline">
            <Link to="/">
              Tillbaka till startsidan
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Om LUFOR</h1>
          <p className="text-lg text-muted-foreground mb-6">
            LUFOR är en plattform för att samla in, analysera och visualisera observationer av obemannade luftfarkoster (drönare) från allmänheten. Syftet är att stärka Sveriges nationella beredskap och situational awareness i luftrummet.
          </p>
          <div className="space-y-4 text-foreground/90">
            <p>
              Genom att rapportera dina observationer bidrar du direkt till en tryggare och säkrare miljö. Varje rapport är en viktig pusselbit som hjälper myndigheter och andra aktörer att få en bättre bild av aktiviteten i luftrummet.
            </p>
            <p>
              Denna applikation är utvecklad med fokus på användarvänlighet, säkerhet och tillgänglighet för att göra det så enkelt som möjligt för alla att bidra. Din data hanteras med största sekretess och används endast i syfte att stärka den nationella säkerheten.
            </p>
            <p>Tack för ditt engagemang!</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
