import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage/LoginPage';
import { WelcomeSetup } from './components/WelcomeSetup/WelcomeSetup';
import { SetupFlow } from './components/SetupFlow/SetupFlow';
import { FinancialOverview } from './components/FinancialOverview/FinancialOverview';
import { Navbar } from './components/Navbar/Navbar';
import { Challenges } from './components/Challenges/Challenges';
import { Education } from './components/Education/Education';
import { Rewards } from './components/Rewards/Rewards';
import { Community } from './components/Community/Community';
import { News } from './components/News/News';
import { Settings } from './components/Settings/Settings';
import { useTheme } from './ThemeContext';
import { SettingsButton } from './components/SettingsButton/SettingsButton';
import { Footer } from './components/Footer/Footer';
import { ChallengeCompletionModal } from './components/Challenges/ChallengeCompletionModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showSettings, setShowSettings] = useState(false);
  const [escrowProgress, setEscrowProgress] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const { isDark } = useTheme();

  // Reset setup state on logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setHasCompletedSetup(false);
    setActiveSection('home');
    setShowSettings(false);
    // Clear any stored flow data
    localStorage.removeItem('flowData');
  };

  // Scroll to top when changing sections
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const handleLogin = (studentId: string, password: string) => {
    console.log('Login attempt:', { studentId, password });
    setIsLoggedIn(true);
    setHasCompletedSetup(false); // Reset setup state on login
  };

  const handleNavigation = (section: string) => {
    if (section === 'settings') {
      setShowSettings(true);
      setActiveSection('settings');
    } else {
      setActiveSection(section);
      setShowSettings(false);
    }
  };

  const handleSetupComplete = () => {
    setHasCompletedSetup(true);
  };

  const handleCompleteDailyChallenge = (challengeId: string) => {
    console.log(`Completed daily challenge: ${challengeId}`);
    
    setEscrowProgress(prev => {
      const newProgress = Math.min(prev + 1, 3);
      
      if (newProgress === 3 && prev < 3) {
        setTimeout(() => {
          setShowCompletionModal(true);
        }, 500);
      }
      
      return newProgress;
    });
  };

  // Apply consistent gradient background
  const gradientClass = isDark
    ? 'bg-gradient-to-br from-brand-purple/80 via-[#1a1c2a]/90 to-black/80'
    : 'bg-gradient-to-br from-brand-purple via-white to-brand-purple/10';

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${gradientClass}`}>
        {isLoggedIn && (
          <Navbar 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout}
            activeSection={activeSection}
            onNavigation={handleNavigation}
          />
        )}
        
        {/* Settings Button (Mobile Only) */}
        {isLoggedIn && <SettingsButton onClick={() => setShowSettings(!showSettings)} />}
        
        <div className="pt-16 md:pt-20 pb-16 md:pb-0">
          <div className="py-8">
            <Routes>
              {/* Root Route */}
              <Route 
                path="/" 
                element={
                  !isLoggedIn ? (
                    <LoginPage onLogin={handleLogin} />
                  ) : !hasCompletedSetup ? (
                    <Navigate to="/welcome" replace />
                  ) : (
                    <Navigate to="/overview" replace />
                  )
                } 
              />

              {/* Welcome Route - Protected */}
              <Route 
                path="/welcome" 
                element={
                  isLoggedIn ? (
                    !hasCompletedSetup ? (
                      <WelcomeSetup />
                    ) : (
                      <Navigate to="/overview" replace />
                    )
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />

              {/* Setup Route - Protected */}
              <Route 
                path="/setup" 
                element={
                  isLoggedIn ? (
                    !hasCompletedSetup ? (
                      <SetupFlow onComplete={handleSetupComplete} />
                    ) : (
                      <Navigate to="/overview" replace />
                    )
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />

              {/* Overview Route - Protected */}
              <Route 
                path="/overview" 
                element={
                  isLoggedIn ? (
                    hasCompletedSetup ? (
                      showSettings ? (
                        <Settings onClose={() => {
                          setShowSettings(false);
                          setActiveSection('home');
                        }} />
                      ) : (
                        <>
                          {activeSection === 'home' && (
                            <FinancialOverview 
                              escrowProgress={escrowProgress} 
                              onEditSetup={() => setHasCompletedSetup(false)}
                            />
                          )}
                          {activeSection === 'challenges' && <Challenges onCompleteDailyChallenge={handleCompleteDailyChallenge} />}
                          {activeSection === 'education' && <Education />}
                          {activeSection === 'rewards' && <Rewards />}
                          {activeSection === 'community' && <Community />}
                          {activeSection === 'news' && <News />}
                        </>
                      )
                    ) : (
                      <Navigate to="/welcome" replace />
                    )
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
        
        {/* Challenge Completion Modal */}
        <ChallengeCompletionModal 
          isOpen={showCompletionModal}
          onClose={() => {
            setShowCompletionModal(false);
            setActiveSection('home');
          }}
          escrowAmount={30}
        />
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;