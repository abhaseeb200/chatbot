import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Activity, 
  ArrowLeft, 
  User,
  Bot,
  Clock,
  TrendingUp,
  AlertCircle,
  Upload,
  FileJson,
  History
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: "chatbot_config.json", uploadedAt: "2024-01-15 10:30", size: "2.3 KB" },
    { id: 2, name: "user_intents.json", uploadedAt: "2024-01-14 15:45", size: "5.1 KB" },
    { id: 3, name: "responses.json", uploadedAt: "2024-01-13 09:20", size: "8.7 KB" },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      const newFile = {
        id: uploadedFiles.length + 1,
        name: file.name,
        uploadedAt: new Date().toLocaleString(),
        size: `${(file.size / 1024).toFixed(1)} KB`
      };
      setUploadedFiles(prev => [newFile, ...prev]);
    }
  };

  const chatSessions = [
    { id: 1, user: "John Doe", messages: 15, duration: "12m", status: "active", lastMessage: "2 min ago" },
    { id: 2, user: "Jane Smith", messages: 8, duration: "8m", status: "completed", lastMessage: "5 min ago" },
    { id: 3, user: "Mike Johnson", messages: 23, duration: "18m", status: "buffering", lastMessage: "1 min ago" },
    { id: 4, user: "Sarah Wilson", messages: 4, duration: "3m", status: "active", lastMessage: "just now" },
  ];

  const recentMessages = [
    { id: 1, user: "John Doe", message: "How can I reset my password?", time: "2 min ago", type: "user" },
    { id: 2, user: "AI Bot", message: "I can help you reset your password...", time: "1 min ago", type: "bot" },
    { id: 3, user: "Jane Smith", message: "What are your business hours?", time: "5 min ago", type: "user" },
    { id: 4, user: "AI Bot", message: "Our business hours are...", time: "4 min ago", type: "bot" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "buffering": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-gray-600">Monitor and manage chat sessions</p>
              </div>
            </div>
            <Button asChild>
              <Link to="/chat">Go to Chat</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="json-manager">JSON Manager</TabsTrigger>
            <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">24</div>
                  <p className="text-xs text-muted-foreground">+12% from last hour</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <p className="text-xs text-muted-foreground">+8% from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Buffer Processing</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">7</div>
                  <p className="text-xs text-muted-foreground">Currently processing</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">2.4s</div>
                  <p className="text-xs text-muted-foreground">-0.3s from last hour</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Chat Sessions</CardTitle>
                  <CardDescription>Latest user interactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {chatSessions.slice(0, 4).map((session) => (
                    <div key={session.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{session.user}</p>
                          <p className="text-xs text-gray-500">{session.messages} messages</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Real-time system health</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Response Time</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Good</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Buffer Processing</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-yellow-600">Moderate</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Connection</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Stable</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Model Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="json-manager" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Upload JSON File</span>
                  </CardTitle>
                  <CardDescription>Upload configuration files for the chatbot</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="json-upload">Select JSON File</Label>
                    <Input
                      id="json-upload"
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Supported formats: JSON files only</p>
                    <p>Maximum file size: 10MB</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <History className="h-5 w-5" />
                    <span>Upload History</span>
                  </CardTitle>
                  <CardDescription>Recently uploaded JSON files</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileJson className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.uploadedAt} • {file.size}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Chat Sessions</CardTitle>
                <CardDescription>Monitor active conversations in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chatSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{session.user}</h4>
                          <p className="text-sm text-gray-600">
                            {session.messages} messages • {session.duration} duration
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{session.lastMessage}</span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Latest messages across all sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={msg.type === 'bot' ? 'bg-blue-100' : 'bg-gray-100'}>
                          {msg.type === 'bot' ? <Bot className="h-4 w-4 text-blue-600" /> : <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-medium text-sm">{msg.user}</h5>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Usage Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Daily Active Users</span>
                        <span className="text-green-600">+15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Message Volume</span>
                        <span className="text-blue-600">+8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Response Accuracy</span>
                        <span className="text-purple-600">95%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>Buffer Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Buffer Time</span>
                      <span className="text-lg font-semibold text-yellow-600">2.1s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Buffer Success Rate</span>
                      <span className="text-lg font-semibold text-green-600">99.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Queue Length</span>
                      <span className="text-lg font-semibold text-blue-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Peak Buffer Time</span>
                      <span className="text-lg font-semibold text-red-600">4.8s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
