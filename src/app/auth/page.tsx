'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient'

const AuthPage = () => {
    const router = useRouter();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                router.push('/');
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [router]);

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={[]}
            />
        </div>
    );
};

export default AuthPage;