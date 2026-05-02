'use client';

import { useActionState } from 'react';
import { login } from '../actions';
import { ArrowRight, Lock } from 'lucide-react';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, { error: null });

  return (
    <div className="min-h-screen bg-[#050509] flex items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6">
            <Lock className="w-6 h-6 text-zinc-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Admin Access</h1>
          <p className="text-sm text-zinc-400">Sign in to manage the Devesters platform.</p>
        </div>

        <form action={formAction} className="space-y-6 mt-10">
          {state?.error && (
            <div className="p-3 text-sm text-[#FF1C1C] bg-[#FF1C1C]/10 border border-[#FF1C1C]/20 rounded-lg">
              {state.error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-600"
                placeholder="admin@devesters.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-600"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-black hover:bg-zinc-200 transition-colors py-3 px-4 rounded-lg font-medium flex justify-center items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
            {!isPending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </div>
    </div>
  );
}
