export function StatusCard() {
  return (
    <div className="bg-card rounded-[20px] p-5 shadow-[0_10px_30px_rgba(24,24,27,0.08)]">
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#18794E] mt-2 flex-shrink-0"></div>
          <p className="text-[15px] leading-[22px]">오늘 무료 1회가 남아 있어요</p>
        </div>
        
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#71717A] mt-2 flex-shrink-0"></div>
          <p className="text-[15px] leading-[22px] text-[#71717A]">광고 시청 후 한 판 더 도전할 수 있어요</p>
        </div>
        
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#B7791F] mt-2 flex-shrink-0"></div>
          <p className="text-[15px] leading-[22px] text-[#71717A]">랭킹 저장은 닉네임 설정 후 가능해요</p>
        </div>
      </div>
    </div>
  );
}
