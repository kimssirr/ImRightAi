interface DebateBubbleProps {
  type: 'ai' | 'user';
  message: string;
}

export function DebateBubble({ type, message }: DebateBubbleProps) {
  const isAI = type === 'ai';
  
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[82%] ${isAI ? 'items-start' : 'items-end'} flex flex-col gap-1`}>
        <div className="flex items-center gap-2 px-1">
          <span className={`text-[12px] leading-[16px] ${
            isAI ? 'text-[#243B53]' : 'text-[#A04A00]'
          }`} style={{ fontWeight: 600 }}>
            {isAI ? 'AI' : '나'}
          </span>
        </div>
        <div className={`rounded-[16px] px-4 py-3 ${
          isAI 
            ? 'bg-[#EAF1F8] text-[#18181B] rounded-tl-[4px]' 
            : 'bg-[#FFF1E2] text-[#18181B] rounded-tr-[4px]'
        }`}>
          <p className="text-[15px] leading-[22px]">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}