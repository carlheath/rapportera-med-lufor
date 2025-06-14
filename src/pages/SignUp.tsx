
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    setLoading(false);

    if (error) {
      toast.error('Fel vid registrering', { description: error.message });
    } else {
      toast.success('Registrering lyckades!', {
        description: 'Vänligen kolla din e-post för att bekräfta ditt konto.',
      });
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header>
        <Button asChild variant="outline">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tillbaka
          </Link>
        </Button>
      </Header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Skapa konto</CardTitle>
              <CardDescription>
                Fyll i dina uppgifter för att registrera dig.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-post</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="namn@exempel.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Lösenord</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Registrerar...' : 'Skapa konto'}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                Har du redan ett konto?{' '}
                <Link to="/login" className="underline">
                  Logga in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
