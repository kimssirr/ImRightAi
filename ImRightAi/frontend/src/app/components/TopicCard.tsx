export function TopicCard() {
  return (
    <div className="bg-card rounded-[20px] p-6 shadow-[0_10px_30px_rgba(24,24,27,0.08)]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[13px] text-[#71717A]">2026.03.19</span>
      </div>
      
      <h2 className="text-[22px] leading-[28px] mb-6" style={{ fontWeight: 600 }}>
        재택근무는 생산성을 높인다
      </h2>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#F7F4EF] rounded-[14px] p-4 border-2 border-transparent hover:border-[#FF6B3D] transition-colors cursor-pointer">
          <div className="text-[13px] text-[#71717A] mb-1">선택지 A</div>
          <div className="text-[15px] leading-[22px]" style={{ fontWeight: 500 }}>
            그렇다
          </div>
        </div>
        
        <div className="bg-[#F7F4EF] rounded-[14px] p-4 border-2 border-transparent hover:border-[#FF6B3D] transition-colors cursor-pointer">
          <div className="text-[13px] text-[#71717A] mb-1">선택지 B</div>
          <div className="text-[15px] leading-[22px]" style={{ fontWeight: 500 }}>
            아니다
          </div>
        </div>
      </div>
    </div>
  );
}
