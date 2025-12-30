interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionHeader = ({ eyebrow, title, subtitle, align = 'left' }: SectionHeaderProps) => {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow && <span className="pill bg-emerald-50 text-emerald-800">{eyebrow}</span>}
      <h2 className="text-3xl font-semibold text-emerald-900 sm:text-4xl">{title}</h2>
      {subtitle && <p className="max-w-2xl text-base text-slate-600">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
