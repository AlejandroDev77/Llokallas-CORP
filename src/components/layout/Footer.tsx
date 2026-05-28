import { PROJECT_INFO } from '../../constants';

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 text-center border-t border-yellow-400/20">
      <p className="text-gray-500 text-sm tracking-widest uppercase">
        © {PROJECT_INFO.year} {PROJECT_INFO.title} · {PROJECT_INFO.subtitle}
      </p>
      <p className="text-gray-600 text-xs mt-2">May the Force be with you</p>
    </footer>
  );
}
