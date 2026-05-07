import { LoginCard } from "@/components/auth/login-card";

export default function BuilderLogin() {
  return (
    <LoginCard
      flavor="builder"
      title="Sign in to Nebius Builders"
      subtitle="Find an event, form a team, ship an OpenClaw agent."
      redirect="/builders/dashboard"
    />
  );
}
