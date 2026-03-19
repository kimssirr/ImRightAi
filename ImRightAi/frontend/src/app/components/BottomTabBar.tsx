import { Home, Trophy, User } from 'lucide-react';

interface BottomTabBarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function BottomTabBar({ currentTab = 'home', onTabChange }: BottomTabBarProps) {
  const tabs = [
    { icon: Home, label: '홈', id: 'home' },
    { icon: Trophy, label: '랭킹', id: 'ranking' },
    { icon: User, label: '내 기록', id: 'myrecord' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-[#E4E4E7] max-w-[390px] mx-auto">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
            >
              <Icon 
                className={`w-6 h-6 mb-1 transition-colors ${
                  isActive ? 'text-[#FF6B3D]' : 'text-[#71717A]'
                }`}
              />
              <span 
                className={`text-[11px] transition-colors ${
                  isActive ? 'text-[#FF6B3D]' : 'text-[#71717A]'
                }`}
                style={{ fontWeight: isActive ? 600 : 500 }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}