export default function App() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-950 p-4 font-sans select-none antialiased">
      <div className="text-center space-y-4 max-w-xl">
        <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full inline-block border border-emerald-500/20 shadow-sm">
          Landing page
        </p>

        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-400 tracking-tight py-2">
          LLOKALLAS CORP
        </h1>

        <div className="h-0.5 w-24 bg-linear-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full shadow-lg shadow-emerald-500/50" />

        <p className="text-sm font-medium text-slate-400 tracking-wide pt-2">
          3D
          
        </p>
      </div>

      <div className="absolute bottom-6 text-[10px] font-mono tracking-widest text-slate-600 uppercase">
        © 2026 llokallas corp · v1.0.0
      </div>
    </div>
  );
}
