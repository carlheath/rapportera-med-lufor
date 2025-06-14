
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <Button asChild variant="outline">
            <Link to="/">
              Tillbaka till startsidan
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Logga in</CardTitle>
            <CardDescription>
              Endast för behörig personal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-post</Label>
                <Input id="email" type="email" placeholder="namn@exempel.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Lösenord</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Logga in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
