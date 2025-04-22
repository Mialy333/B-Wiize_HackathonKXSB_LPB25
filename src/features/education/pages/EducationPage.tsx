export default function EducationPage() {
  return <div className="p-8 text-xl">Contenu pédagogique 📚</div>;
}
import CapsuleStory from "../components/CapsuleStory";

export default function EducationPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Capsule éducative du jour 🎓</h1>
      <CapsuleStory />
    </div>
  );
}
