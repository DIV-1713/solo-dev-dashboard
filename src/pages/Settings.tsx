
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import { Save, User } from 'lucide-react';

const Settings = () => {
  const [isDirty, setIsDirty] = useState(false);
  
  const handleValueChange = () => {
    setIsDirty(true);
  };
  
  const handleSave = () => {
    // Save settings logic would go here
    setIsDirty(false);
  };
  
  return (
    <AppLayout>
      <div className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center md:items-start gap-2 md:w-1/4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="" alt="Profile" />
                      <AvatarFallback className="text-xl">
                        <User className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Your name" 
                          defaultValue="John Developer"
                          onChange={handleValueChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Your email"
                          defaultValue="john@example.com"
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="w-full min-h-[100px] p-2.5 rounded-md bg-background border border-input"
                        placeholder="Tell us about yourself"
                        defaultValue="Solo developer and indie hacker building useful tools."
                        onChange={handleValueChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>
                  Connect your social profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input 
                    id="github" 
                    placeholder="https://github.com/yourusername"
                    defaultValue="https://github.com/johndeveloper"
                    onChange={handleValueChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input 
                    id="twitter" 
                    placeholder="https://twitter.com/yourusername"
                    defaultValue="https://twitter.com/johndeveloper"
                    onChange={handleValueChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input 
                    id="website" 
                    placeholder="https://yourwebsite.com"
                    defaultValue="https://johndeveloper.com"
                    onChange={handleValueChange}
                  />
                </div>
              </CardContent>
            </Card>
            
            {isDirty && (
              <div className="sticky bottom-6 flex justify-center">
                <Button onClick={handleSave} size="lg" className="shadow-lg">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Interface</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Set the app to dark mode
                      </p>
                    </div>
                    <Switch defaultChecked={true} onCheckedChange={handleValueChange} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact View</p>
                      <p className="text-sm text-muted-foreground">
                        Show more content in a compact layout
                      </p>
                    </div>
                    <Switch onCheckedChange={handleValueChange} />
                  </div>
                  
                  <Separator />
                  
                  <h3 className="text-lg font-medium">Date & Time</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="w-full p-2.5 rounded-md bg-background border border-input"
                      defaultValue="UTC"
                      onChange={handleValueChange}
                    >
                      <option value="UTC">UTC (Coordinated Universal Time)</option>
                      <option value="EST">EST (Eastern Standard Time)</option>
                      <option value="PST">PST (Pacific Standard Time)</option>
                      <option value="CET">CET (Central European Time)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Task Due Reminders</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when tasks are due
                      </p>
                    </div>
                    <Switch defaultChecked={true} onCheckedChange={handleValueChange} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Project Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Notify when projects are updated
                      </p>
                    </div>
                    <Switch defaultChecked={true} onCheckedChange={handleValueChange} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch onCheckedChange={handleValueChange} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Connect with other services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-muted-foreground">
                        Connect with your GitHub account
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleValueChange}>Connect</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Google Calendar</p>
                      <p className="text-sm text-muted-foreground">
                        Sync your tasks with Google Calendar
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleValueChange}>Connect</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Vercel</p>
                      <p className="text-sm text-muted-foreground">
                        Connect to your Vercel deployments
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleValueChange}>Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
