import { useState, useRef, useEffect } from 'react';
import { TopicCard } from './components/TopicCard';
import { StatusCard } from './components/StatusCard';
import { ChoiceCard } from './components/ChoiceCard';
import { DebateBubble } from './components/DebateBubble';
import { BottomTabBar } from './components/BottomTabBar';
import { ResultScreen } from './components/ResultScreen';
import { RankingScreen } from './components/RankingScreen';
import { MyRecordScreen } from './components/MyRecordScreen';

type Screen = 'home' | 'choice' | 'debate' | 'result' | 'ranking' | 'myrecord';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [topicSuggestion, setTopicSuggestion] = useState({
    question: '',
    optionA: '',
    optionB: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>('A');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSend = () => {
    if (inputText.trim()) {
      // Here you would add the message to your conversation
      setInputText('');
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'home') setCurrentScreen('home');
    if (tab === 'ranking') setCurrentScreen('ranking');
    if (tab === 'myrecord') setCurrentScreen('myrecord');
  };

  if (currentScreen === 'debate') {
    return (
      <div className="h-screen bg-background flex flex-col max-w-[390px] mx-auto w-full">
        {/* Top Bar */}
        <div className="bg-card border-b border-[#E4E4E7] px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={() => setCurrentScreen('choice')}
              className="text-[15px] text-[#71717A] hover:text-foreground transition-colors"
              style={{ fontWeight: 500 }}
            >
              나가기
            </button>
            <div className="text-[13px] px-3 py-1 bg-[#F7F4EF] rounded-full" style={{ fontWeight: 600 }}>
              라운드 1/3
            </div>
          </div>
          <h2 className="text-[18px] leading-[24px]" style={{ fontWeight: 600 }}>
            재택근무는 생산성을 높인다
          </h2>
        </div>

        {/* Helper Text */}
        <div className="bg-[#FFF7E0] px-4 py-2 border-b border-[#E4E4E7] flex-shrink-0">
          <p className="text-[13px] leading-[18px] text-[#18181B]">
            <span style={{ fontWeight: 600 }}>내 입장:</span> 그렇다 · 
            <span className="text-[#71717A] ml-1">AI는 반대 입장에서 토론합니다</span>
          </p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <DebateBubble
            type="ai"
            message="안녕하세요. 저는 재택근무가 생산성을 높이지 않는다는 입장에서 토론을 시작하겠습니다. 재택근 환경에서는 업무와 개인 생활의 경계가 모호해지고, 팀원 간의 즉각적인 소통이 어려워 오히려 협업 효율성이 떨어집니다."
          />
          
          <DebateBubble
            type="user"
            message="재택근무는 통근 시간을 절약해 더 많은 업무 시간을 확보할 수 있습니다. 또한 조용한 환경에서 집중력이 높아져 심층 작업의 품질이 향상됩니다."
          />
          
          <DebateBubble
            type="ai"
            message="통근 시간 절약은 사실이지만, 재택근무 시 가정 내 돌발 상황이나 외부 방해 요소가 많아 실제로는 집중이 더 어렵습니다. 사무실의 구조화된 환경이 오히려 더 높은 생산성을 보장합니다."
          />
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-card border-t border-[#E4E4E7] px-4 py-4 flex-shrink-0">
          <div className="flex gap-2">
            <div className="flex-1 bg-[#F7F4EF] rounded-[14px] border border-[#E4E4E7] focus-within:border-[#FF6B3D] transition-colors">
              <textarea
                value={inputText}
                onChange={(e) => {
                  if (e.target.value.length <= 250) {
                    setInputText(e.target.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="내 주장을 250자 이내로 입력해 주세요"
                className="w-full bg-transparent px-4 pt-3 pb-2 text-[15px] leading-[22px] resize-none outline-none min-h-[80px] max-h-[160px]"
                style={{ fontWeight: 400 }}
              />
              <div className="px-4 pb-3 flex justify-between items-center">
                <span className="text-[12px] text-[#71717A]">
                  {inputText.length}/250
                </span>
              </div>
            </div>
            
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`px-5 rounded-[14px] h-[116px] transition-all flex-shrink-0 ${
                inputText.trim()
                  ? 'bg-[#FF6B3D] hover:bg-[#F05A28] text-white'
                  : 'bg-[#E4E4E7] text-[#71717A] cursor-not-allowed'
              }`}
              style={{ fontWeight: 600 }}
            >
              보내기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'choice') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Mobile frame container - 390x844 */}
        <div className="flex-1 max-w-[390px] mx-auto w-full bg-background overflow-y-auto pb-24">
          {/* Header */}
          <header className="px-4 pt-8 pb-6">
            <button 
              onClick={() => setCurrentScreen('home')}
              className="mb-4 text-[#71717A] hover:text-foreground transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
              </svg>
            </button>
            <h1 className="text-[26px] leading-[32px]" style={{ fontWeight: 600 }}>
              어느 쪽을 선택할래요?
            </h1>
            <p className="text-[15px] leading-[22px] text-[#71717A] mt-2">
              선택한 입장의 반대편에서 AI가 토론을 시작해요.
            </p>
          </header>

          {/* Main Content */}
          <main className="px-4 space-y-6">
            {/* Topic Display */}
            <div className="bg-[#F7F4EF] rounded-[14px] p-4 border border-[#E4E4E7]">
              <div className="text-[13px] text-[#71717A] mb-1">오늘의 주제</div>
              <div className="text-[18px] leading-[24px]" style={{ fontWeight: 600 }}>
                재택근무는 생산성을 높인다
              </div>
            </div>

            {/* Choice Cards */}
            <div className="space-y-4">
              <ChoiceCard
                label="선택지 A"
                option="그렇다"
                content="재택근무가 생산성을 높인다는 입장"
                selected={selectedChoice === 'A'}
                onClick={() => setSelectedChoice('A')}
              />
              
              <ChoiceCard
                label="선택지 B"
                option="아니다"
                content="재택근무가 생산성을 높이지 않는다는 입장"
                selected={selectedChoice === 'B'}
                onClick={() => setSelectedChoice('B')}
              />
            </div>

            {/* CTA Button */}
            <button 
              disabled={!selectedChoice}
              onClick={() => setCurrentScreen('debate')}
              className={`w-full rounded-[16px] h-14 transition-all ${
                selectedChoice
                  ? 'bg-[#FF6B3D] hover:bg-[#F05A28] text-white shadow-[0_4px_12px_rgba(240,90,40,0.25)]'
                  : 'bg-[#E4E4E7] text-[#71717A] cursor-not-allowed'
              }`}
              style={{ fontWeight: 600 }}
            >
              {selectedChoice ? '이 입장으로 시작하기' : '입장을 선택해 주세요'}
            </button>
          </main>
        </div>

        {/* Bottom Tab Bar */}
        <BottomTabBar currentTab="home" onTabChange={handleTabChange} />
      </div>
    );
  }

  if (currentScreen === 'result') {
    return (
      <>
        <ResultScreen />
        <BottomTabBar currentTab="home" onTabChange={handleTabChange} />
      </>
    );
  }

  if (currentScreen === 'ranking') {
    return (
      <>
        <RankingScreen />
        <BottomTabBar currentTab="ranking" onTabChange={handleTabChange} />
      </>
    );
  }

  if (currentScreen === 'myrecord') {
    return (
      <>
        <MyRecordScreen />
        <BottomTabBar currentTab="myrecord" onTabChange={handleTabChange} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile frame container - 390x844 */}
      <div className="flex-1 max-w-[390px] mx-auto w-full bg-background overflow-y-auto pb-24">
        {/* Header */}
        <header className="px-4 pt-8 pb-6">
          <h1 className="text-[26px] leading-[32px] text-center" style={{ fontWeight: 600, fontFamily: 'Cafe24ProUp, sans-serif' }}>
            내가 맞아, AI야!
          </h1>
        </header>

        {/* Main Content */}
        <main className="px-4 space-y-6">
          {/* Section Title */}
          <div className="space-y-2">
            <h2 className="text-[22px] leading-[28px]" style={{ fontWeight: 600 }}>
              오늘의 주제
            </h2>
            <p className="text-[15px] leading-[22px] text-[#71717A]">
              A와 B 중 하나를 고르고, AI와 3라운드 토론을 시작해보세요.
            </p>
          </div>

          {/* Topic Card */}
          <TopicCard />

          {/* Primary CTA */}
          <button 
            onClick={() => setCurrentScreen('choice')}
            className="w-full bg-[#FF6B3D] hover:bg-[#F05A28] text-white rounded-[16px] h-14 transition-colors shadow-[0_4px_12px_rgba(240,90,40,0.25)]"
            style={{ fontWeight: 600 }}
          >
            토론 시작하기
          </button>

          {/* Status Card */}
          <StatusCard />

          {/* Topic Suggestion Section - Secondary Action */}
          <div className="bg-card rounded-[16px] p-4 border border-[#E4E4E7]">
            <h3 className="text-[16px] mb-1" style={{ fontWeight: 600 }}>
              다음 주제 추천하기
            </h3>
            <p className="text-[13px] text-[#71717A] mb-3">
              다음에 보고 싶은 A vs B 주제를 남겨주세요.
            </p>

            {!isSubmitted ? (
              <>
                {/* Question Input */}
                <div className="mb-3">
                  <label className="block text-[13px] text-[#52525B] mb-1.5" style={{ fontWeight: 500 }}>
                    질문:
                  </label>
                  <input
                    type="text"
                    value={topicSuggestion.question}
                    onChange={(e) => setTopicSuggestion({ ...topicSuggestion, question: e.target.value })}
                    placeholder="예: 재택근무가 출근보다 효율적인가?"
                    className="w-full bg-[#F7F4EF] rounded-[12px] border border-[#E4E4E7] focus:border-[#FF6B3D] outline-none px-3 py-2.5 text-[14px] transition-colors"
                    style={{ fontWeight: 400 }}
                  />
                </div>

                {/* Option A Input */}
                <div className="mb-3">
                  <label className="block text-[13px] text-[#52525B] mb-1.5" style={{ fontWeight: 500 }}>
                    A:
                  </label>
                  <input
                    type="text"
                    value={topicSuggestion.optionA}
                    onChange={(e) => setTopicSuggestion({ ...topicSuggestion, optionA: e.target.value })}
                    placeholder="예: 재택근무"
                    className="w-full bg-[#F7F4EF] rounded-[12px] border border-[#E4E4E7] focus:border-[#FF6B3D] outline-none px-3 py-2.5 text-[14px] transition-colors"
                    style={{ fontWeight: 400 }}
                  />
                </div>

                {/* Option B Input */}
                <div className="mb-3">
                  <label className="block text-[13px] text-[#52525B] mb-1.5" style={{ fontWeight: 500 }}>
                    B:
                  </label>
                  <input
                    type="text"
                    value={topicSuggestion.optionB}
                    onChange={(e) => setTopicSuggestion({ ...topicSuggestion, optionB: e.target.value })}
                    placeholder="예: 출근"
                    className="w-full bg-[#F7F4EF] rounded-[12px] border border-[#E4E4E7] focus:border-[#FF6B3D] outline-none px-3 py-2.5 text-[14px] transition-colors"
                    style={{ fontWeight: 400 }}
                  />
                </div>

                <button
                  onClick={() => {
                    if (topicSuggestion.question.trim() && topicSuggestion.optionA.trim() && topicSuggestion.optionB.trim()) {
                      setIsSubmitted(true);
                      // Here you would send the suggestion to the backend
                    }
                  }}
                  disabled={!topicSuggestion.question.trim() || !topicSuggestion.optionA.trim() || !topicSuggestion.optionB.trim()}
                  className={`w-full rounded-[12px] h-11 transition-colors ${
                    topicSuggestion.question.trim() && topicSuggestion.optionA.trim() && topicSuggestion.optionB.trim()
                      ? 'bg-[#F7F4EF] hover:bg-[#E4E4E7] text-[#18181B] border border-[#E4E4E7]'
                      : 'bg-[#F4F4F5] text-[#A1A1AA] cursor-not-allowed'
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  주제 추천 보내기
                </button>
              </>
            ) : (
              <div className="bg-[#F0FDF4] rounded-[12px] p-4 border border-[#BBF7D0]">
                <p className="text-[14px] text-[#166534] text-center" style={{ fontWeight: 500 }}>
                  ✓ 추천이 접수됐어요
                </p>
              </div>
            )}
          </div>

          {/* Ad Slot */}
          <div className="bg-[#E4E4E7] rounded-[14px] h-[100px] flex items-center justify-center border-2 border-dashed border-[#71717A]/30">
            <p className="text-[13px] text-[#71717A]">광고 영역</p>
          </div>
        </main>
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar currentTab="home" onTabChange={handleTabChange} />
    </div>
  );
}
