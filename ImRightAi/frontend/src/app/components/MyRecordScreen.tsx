import { User, Trophy, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export function MyRecordScreen() {
  const [nickname, setNickname] = useState('토론왕김철수');
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [tempNickname, setTempNickname] = useState(nickname);

  // Mock data
  const stats = {
    savedGames: 12,
    highestScore: 94
  };

  const history = [
    {
      id: 1,
      date: '2026.03.18',
      topic: '재택근무는 생산성을 높인다',
      score: 94,
      quote: '통근 시간 절약으로 더 많은 업무 시간을 확보하고, 조용한 환경에서 집중력이 향상됩니다.'
    },
    {
      id: 2,
      date: '2026.03.17',
      topic: '인공지능이 인간의 일자리를 대체할 것이다',
      score: 88,
      quote: 'AI는 반복적인 업무를 자동화하지만, 창의적이고 감성적인 영역은 인간만이 할 수 있습니다.'
    },
    {
      id: 3,
      date: '2026.03.16',
      topic: '채식주의가 환경 보호에 효과적이다',
      score: 82,
      quote: '축산업은 온실가스 배출의 주요 원인이며, 채식은 탄소 발자국을 크게 줄입니다.'
    },
    {
      id: 4,
      date: '2026.03.15',
      topic: '대학 학위가 성공의 필수 조건이다',
      score: 76,
      quote: '학위보다 실무 경험과 실력이 더 중요한 시대가 되었습니다.'
    },
  ];

  const handleSaveNickname = () => {
    if (tempNickname.trim()) {
      setNickname(tempNickname.trim());
      setIsEditingNickname(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile frame container - 390x844 */}
      <div className="flex-1 max-w-[390px] mx-auto w-full bg-background overflow-y-auto pb-24">
        {/* Header */}
        <header className="px-4 pt-8 pb-6">
          <h1 className="text-[26px] leading-[32px] mb-2" style={{ fontWeight: 600 }}>
            내 기록
          </h1>
          <p className="text-[15px] leading-[22px] text-[#71717A]">
            저장한 토론과 최고 점수를 확인할 수 있어요.
          </p>
        </header>

        {/* Main Content */}
        <main className="px-4 space-y-4">
          {/* Nickname Card */}
          <div className="bg-card rounded-[16px] p-4 border border-[#E4E4E7]">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-[#71717A]" />
              <span className="text-[13px] text-[#71717A]" style={{ fontWeight: 600 }}>
                닉네임
              </span>
            </div>
            
            {!isEditingNickname ? (
              <div className="flex items-center justify-between">
                <span className="text-[18px]" style={{ fontWeight: 600 }}>
                  {nickname}
                </span>
                <button
                  onClick={() => {
                    setTempNickname(nickname);
                    setIsEditingNickname(true);
                  }}
                  className="text-[14px] text-[#FF6B3D] hover:text-[#F05A28] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  닉네임 변경
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value)}
                  maxLength={12}
                  className="w-full bg-[#F7F4EF] rounded-[12px] border border-[#E4E4E7] focus:border-[#FF6B3D] outline-none px-3 py-2.5 text-[16px]"
                  style={{ fontWeight: 500 }}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditingNickname(false)}
                    className="flex-1 bg-[#F4F4F5] text-[#71717A] rounded-[10px] h-9 transition-colors hover:bg-[#E4E4E7]"
                    style={{ fontWeight: 600 }}
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSaveNickname}
                    disabled={!tempNickname.trim()}
                    className={`flex-1 rounded-[10px] h-9 transition-colors ${
                      tempNickname.trim()
                        ? 'bg-[#FF6B3D] hover:bg-[#F05A28] text-white'
                        : 'bg-[#F4F4F5] text-[#A1A1AA] cursor-not-allowed'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    저장
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Stats Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Saved Games */}
            <div className="bg-card rounded-[14px] p-4 border border-[#E4E4E7]">
              <div className="flex items-center gap-1.5 mb-2">
                <MessageSquare className="w-4 h-4 text-[#71717A]" />
                <span className="text-[13px] text-[#71717A]" style={{ fontWeight: 500 }}>
                  저장한 게임
                </span>
              </div>
              <span className="text-[24px]" style={{ fontWeight: 700 }}>
                {stats.savedGames}
              </span>
            </div>

            {/* Highest Score */}
            <div className="bg-card rounded-[14px] p-4 border border-[#E4E4E7]">
              <div className="flex items-center gap-1.5 mb-2">
                <Trophy className="w-4 h-4 text-[#FF6B3D]" />
                <span className="text-[13px] text-[#71717A]" style={{ fontWeight: 500 }}>
                  최고 점수
                </span>
              </div>
              <span className="text-[24px] text-[#FF6B3D]" style={{ fontWeight: 700 }}>
                {stats.highestScore}
              </span>
            </div>
          </div>

          {/* History Section */}
          <div className="pt-2">
            <h2 className="text-[16px] mb-3 px-1" style={{ fontWeight: 600 }}>
              토론 기록
            </h2>
            
            <div className="space-y-3">
              {history.map((record) => (
                <div
                  key={record.id}
                  className="bg-card rounded-[14px] p-4 border border-[#E4E4E7] hover:border-[#FF6B3D]/30 transition-colors cursor-pointer"
                >
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] text-[#71717A]" style={{ fontWeight: 500 }}>
                      {record.date}
                    </span>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-[#FF6B3D]" />
                      <span className="text-[16px] text-[#FF6B3D]" style={{ fontWeight: 700 }}>
                        {record.score}
                      </span>
                    </div>
                  </div>

                  {/* Topic */}
                  <h3 className="text-[15px] mb-2 leading-[21px]" style={{ fontWeight: 600 }}>
                    {record.topic}
                  </h3>

                  {/* Quote */}
                  <p className="text-[13px] leading-[19px] text-[#71717A] line-clamp-2">
                    "{record.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
