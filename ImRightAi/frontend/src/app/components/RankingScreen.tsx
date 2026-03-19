import { Trophy, Crown, Medal } from 'lucide-react';

export function RankingScreen() {
  const today = new Date();
  const dateString = `${today.getMonth() + 1}월 ${today.getDate()}일`;

  const topThree = [
    { rank: 1, nickname: '토론왕123', score: 98, quote: '데이터로 증명된 사실입니다.' },
    { rank: 2, nickname: '논리맨', score: 95, quote: '이 관점에서 보면 명확합니다.' },
    { rank: 3, nickname: '말빨좋아', score: 92, quote: '실제 사례를 보면 알 수 있죠.' },
  ];

  const otherRankings = [
    { rank: 4, nickname: '설득력갑', score: 89, quote: '통계가 이를 뒷받침합니다.' },
    { rank: 5, nickname: '아이디어뱅크', score: 87, quote: '다른 각도로 접근해볼까요?' },
    { rank: 6, nickname: '논리정연', score: 85, quote: '단계별로 설명드리겠습니다.' },
    { rank: 7, nickname: '토론마스터', score: 83, quote: '이 부분이 핵심입니다.' },
    { rank: 8, nickname: '생각많음', score: 81, quote: '여러 가능성을 고려했을 때...' },
  ];

  const myRank = { rank: 12, nickname: '나', score: 75, quote: '제 경험상 이렇습니다.' };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-[#FFD700]" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-[#C0C0C0]" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-[#CD7F32]" />;
    return null;
  };

  const getRankBgColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5]';
    if (rank === 2) return 'bg-gradient-to-br from-[#F5F5F5] to-[#E8E8E8]';
    if (rank === 3) return 'bg-gradient-to-br from-[#FFF5E6] to-[#FFE8CC]';
    return 'bg-card';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile frame container - 390x844 */}
      <div className="flex-1 max-w-[390px] mx-auto w-full bg-background overflow-y-auto pb-24">
        {/* Header */}
        <header className="px-4 pt-8 pb-4">
          <h1 className="text-[26px] leading-[32px] mb-2" style={{ fontWeight: 600 }}>
            오늘의 랭킹
          </h1>
          <p className="text-[15px] leading-[22px] text-[#71717A] mb-3">
            오늘 가장 설득력 있었던 토론을 확인해 보세요.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#F7F4EF] px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B3D]" />
            <span className="text-[13px] text-[#18181B]" style={{ fontWeight: 500 }}>
              {dateString}
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 space-y-4 pb-6">
          {/* Top 3 Rankings - Emphasized */}
          <div className="space-y-3">
            {topThree.map((item) => (
              <div 
                key={item.rank}
                className={`${getRankBgColor(item.rank)} rounded-[16px] p-4 border-2 ${
                  item.rank === 1 ? 'border-[#FFD700]' : 'border-transparent'
                } shadow-[0_2px_8px_rgba(0,0,0,0.06)]`}
              >
                <div className="flex items-start gap-3">
                  {/* Rank Badge */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                    {getRankIcon(item.rank) || (
                      <span className="text-[18px] text-[#18181B]" style={{ fontWeight: 700 }}>
                        {item.rank}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[16px]" style={{ fontWeight: 600 }}>
                        {item.nickname}
                      </span>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-[#FF6B3D]" />
                        <span className="text-[16px] text-[#FF6B3D]" style={{ fontWeight: 700 }}>
                          {item.score}
                        </span>
                      </div>
                    </div>
                    <p className="text-[14px] leading-[20px] text-[#52525B] line-clamp-2">
                      "{item.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Rankings - Compact List */}
          <div className="bg-card rounded-[16px] border border-[#E4E4E7] divide-y divide-[#E4E4E7] overflow-hidden">
            {otherRankings.map((item) => (
              <div key={item.rank} className="px-4 py-3 hover:bg-[#F7F4EF] transition-colors">
                <div className="flex items-start gap-3">
                  {/* Rank Number */}
                  <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center">
                    <span className="text-[15px] text-[#71717A]" style={{ fontWeight: 600 }}>
                      {item.rank}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[15px]" style={{ fontWeight: 600 }}>
                        {item.nickname}
                      </span>
                      <span className="text-[15px] text-[#FF6B3D]" style={{ fontWeight: 600 }}>
                        {item.score}
                      </span>
                    </div>
                    <p className="text-[13px] leading-[18px] text-[#71717A] line-clamp-1">
                      "{item.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* My Rank Card */}
          <div className="bg-[#FF6B3D] rounded-[16px] p-4 shadow-[0_4px_12px_rgba(255,107,61,0.25)]">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-white" />
              <span className="text-[13px] text-white" style={{ fontWeight: 600 }}>
                내 순위
              </span>
            </div>
            <div className="flex items-start gap-3">
              {/* Rank Badge */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-[18px] text-[#FF6B3D]" style={{ fontWeight: 700 }}>
                  {myRank.rank}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[16px] text-white" style={{ fontWeight: 600 }}>
                    {myRank.nickname}
                  </span>
                  <span className="text-[18px] text-white" style={{ fontWeight: 700 }}>
                    {myRank.score}
                  </span>
                </div>
                <p className="text-[14px] leading-[20px] text-white/90 line-clamp-2">
                  "{myRank.quote}"
                </p>
              </div>
            </div>
          </div>

          {/* Ad Slot */}
          <div className="bg-[#E4E4E7] rounded-[14px] h-[100px] flex items-center justify-center border-2 border-dashed border-[#71717A]/30 mt-2">
            <p className="text-[13px] text-[#71717A]">광고 영역</p>
          </div>
        </main>
      </div>
    </div>
  );
}