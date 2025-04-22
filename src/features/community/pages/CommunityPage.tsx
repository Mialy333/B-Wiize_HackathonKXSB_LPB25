// features/community/pages/CommunityPage.tsx
import { Community } from "../../../components/Community/Community";
import { VoiceAssistant } from "../../../components/Community/VoiceAssistant";

export default function CommunityPage() {
  return (
    <div className="community-container">
      <Community /> {/* Ton composant existant */}
      <div className="voice-assistant-container fixed bottom-6 right-6 z-50">
        <VoiceAssistant /> {/* 👈 Ajouté ici */}
      </div>
    </div>
  );
}
