import { LoginCard } from "@/components/auth/login-card";

export default function CompanyLogin() {
  return (
    <LoginCard
      flavor="company"
      title="Sign in to Nebius Builders for business"
      subtitle="Run events, sponsor builders, see real integration telemetry."
      redirect="/companies/dashboard"
    />
  );
}
