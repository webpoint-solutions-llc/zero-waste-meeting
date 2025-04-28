import AuthGuard from "@/components/authGaurd";

export default function Home() {
  return (
    <AuthGuard>
      <div>Welcome to Dashboard!</div>
    </AuthGuard>
  );
}
