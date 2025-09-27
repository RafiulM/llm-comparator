import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary: "bg-primary hover:bg-primary/90",
          footerActionLink: "text-primary hover:text-primary/90",
          formFieldInput: "bg-background border-border",
          card: "bg-card border-border",
        },
      }}
      redirectUrl="/compare"
    />
  );
}