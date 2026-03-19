interface ChoiceCardProps {
  label: string;
  option: string;
  content: string;
  selected: boolean;
  onClick: () => void;
}

export function ChoiceCard({ label, option, content, selected, onClick }: ChoiceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-[20px] border-2 transition-all text-left ${
        selected
          ? 'border-[#FF6B3D] bg-[#FFE4D9]'
          : 'border-[#E4E4E7] bg-card hover:border-[#71717A]'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[13px] text-[#71717A]">{label}</span>
        {selected && (
          <div className="w-6 h-6 rounded-full bg-[#FF6B3D] flex items-center justify-center flex-shrink-0">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-[18px] leading-[24px]" style={{ fontWeight: 600 }}>
          {option}
        </div>
        <div className="text-[15px] leading-[22px] text-[#71717A]">
          {content}
        </div>
      </div>
    </button>
  );
}
