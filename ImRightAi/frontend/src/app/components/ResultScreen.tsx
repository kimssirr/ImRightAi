import { Trophy, Sparkles } from 'lucide-react';

export function ResultScreen() {
  const totalScore = 87;
  const scoreBreakdown = [
    { label: '논리성', score: 30, max: 35 },
    { label: '설득력', score: 28, max: 35 },
    { label: '일관성', score: 29, max: 30 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile frame container - 390x844 */}
      <div className="flex-1 max-w-[390px] mx-auto w-full bg-background overflow-y-auto pb-24">
        {/* Header */}
        <header className="px-4 pt-8 pb-6">
          <h1 className="text-[26px] leading-[32px] text-center mb-2" style={{ fontWeight: 600 }}>
            토론이 끝났어요
          </h1>
          <p className="text-[15px] leading-[22px] text-[#71717A] text-center">
            이번 판의 점수와 핵심 한마디를 확인해 보세요.
          </p>
        </header>

        {/* Main Content */}
        <main className="px-4 space-y-4 pb-6">
          {/* Score Card - Primary Visual */}
          <div className="bg-card rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#E4E4E7]">
            {/* Label */}
            <div className="flex items-center justify-center gap-1 mb-4">
              <Trophy className="w-4 h-4 text-[#FF6B3D]" />
              <span className="text-[13px] text-[#71717A]" style={{ fontWeight: 500 }}>
                이번 점수
              </span>
            </div>

            {/* Large Score */}
            <div className="text-center mb-6">
              <div className="text-[72px] leading-[80px] text-[#FF6B3D]" style={{ fontWeight: 700 }}>
                {totalScore}
              </div>
              <div className="text-[15px] text-[#71717A] mt-1">/ 100점</div>
            </div>

            {/* One-line Review */}
            <div className="bg-[#F7F4EF] rounded-[14px] p-4 mb-4">
              <div className="text-[13px] text-[#71717A] mb-1" style={{ fontWeight: 500 }}>
                한줄 총평
              </div>
              <p className="text-[15px] leading-[22px]" style={{ fontWeight: 600 }}>
                논리적이고 설득력 있는 주장이었어요!
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-2">
              {scoreBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-[14px] text-[#71717A]">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-[120px] h-[6px] bg-[#F4F4F5] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#FF6B3D] rounded-full transition-all"
                        style={{ width: `${(item.score / item.max) * 100}%` }}
                      />
                    </div>
                    <span className="text-[14px] text-[#18181B] w-[50px] text-right" style={{ fontWeight: 600 }}>
                      {item.score}/{item.max}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Card */}
          <div className="bg-card rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#E4E4E7]">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#FF6B3D]" />
              <h3 className="text-[15px]" style={{ fontWeight: 600 }}>
                이번 판의 한마디
              </h3>
            </div>
            <div className="bg-[#FFF1E2] rounded-[14px] p-4 border-l-4 border-[#FF6B3D]">
              <p className="text-[15px] leading-[22px]" style={{ fontWeight: 500 }}>
                "재택근무는 통근 시간을 절약해 더 많은 업무 시간을 확보할 수 있습니다."
              </p>
            </div>
          </div>

          {/* CTA Group */}
          <div className="space-y-3 pt-2">
            {/* Primary CTA */}
            <button className="w-full bg-[#FF6B3D] hover:bg-[#F05A28] text-white rounded-[16px] h-14 transition-colors shadow-[0_4px_12px_rgba(240,90,40,0.25)]" style={{ fontWeight: 600 }}>
              결과 저장하고 랭킹 올리기
            </button>

            {/* Secondary CTA */}
            <button className="w-full bg-card hover:bg-[#F7F4EF] text-[#18181B] rounded-[16px] h-14 transition-colors border-2 border-[#E4E4E7]" style={{ fontWeight: 600 }}>
              한 판 더 하기
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}