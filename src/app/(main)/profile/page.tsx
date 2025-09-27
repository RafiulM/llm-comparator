import { getUserProfile } from "@/app/actions/profiles";
import { updateProfileAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Key } from "lucide-react";

export default async function ProfilePage() {
  const profile = await getUserProfile();

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your API keys and profile information
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Your basic profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  value={profile.id}
                  disabled
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="createdAt">Account Created</Label>
                <Input
                  id="createdAt"
                  value={new Date(profile.created_at).toLocaleDateString()}
                  disabled
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* API Keys */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Keys
            </CardTitle>
            <CardDescription>
              Configure your API keys for LLM model access. Keys are encrypted and stored securely.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={updateProfileAction} className="space-y-6">
              <div>
                <Label htmlFor="openaiKey">OpenAI API Key</Label>
                <Input
                  id="openaiKey"
                  name="openai_api_key"
                  type="password"
                  placeholder="sk-..."
                  defaultValue={profile.openai_api_key || ""}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Your OpenAI API key for accessing GPT models
                </p>
              </div>

              <div>
                <Label htmlFor="googleKey">Google Gemini API Key</Label>
                <Input
                  id="googleKey"
                  name="google_api_key"
                  type="password"
                  placeholder="AI..."
                  defaultValue={profile.google_api_key || ""}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Your Google Gemini API key for accessing Gemini models
                </p>
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                Update API Keys
              </Button>
            </form>
          </CardContent>
        </Card>

        <Separator />

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Getting API Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">OpenAI API Key:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Platform</a></li>
                  <li>Sign in to your account</li>
                  <li>Click "Create new secret key"</li>
                  <li>Copy the key and paste it above</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Google Gemini API Key:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Go to <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a></li>
                  <li>Sign in with your Google account</li>
                  <li>Click "Create API Key"</li>
                  <li>Copy the key and paste it above</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}