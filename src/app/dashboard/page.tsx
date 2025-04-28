import Human from "@/icons/human";

export default function Dashboard() {
  const FULL_NAME = "Fucus";
  const TIME = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div>
      <div>
        Hey, {FULL_NAME}
        <div className="flex gap-1">
          <Human />
          {TIME}
        </div>
      </div>
    </div>
  );
}
