import React from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const SignInPage: React.FC = () => {
  const { signIn, isLoaded, isSignedIn } = useSignIn();
  const router = useRouter();

  React.useEffect(() => {
    if (isSignedIn) {
      router.push('/'); // Redirect to home if already signed in
    }
  }, [isSignedIn, router]);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signIn.create({ identifier: email, password });
      router.push('/'); // Redirect to home after successful sign in
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // Show loading state while Clerk is loading
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInPage;