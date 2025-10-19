// components/NeonButton.tsx
export default function NeonButton({
    children,
    onClick,
    className = "",
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) {
    return (
      <button
        onClick={onClick}
        className={`bg-gradient-to-br from-acc1 to-acc2 text-black font-semibold px-6 py-3 rounded-xl shadow-xl hover:scale-105 transition-all duration-200 ${className}`}
      >
        {children}
      </button>
    );
  }
  