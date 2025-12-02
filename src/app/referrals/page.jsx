"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Copy } from "lucide-react";

export default function ReferralPage() {
  const referralLink = "https://yourapp.com/ref/harshad123";

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-white p-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Referrals & Rewards</h1>
          <p className="text-gray-600 mt-1">
            Invite your friends and earn credits for every signup.
          </p>
        </div>

        {/* REFERRAL LINK BOX */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Your Referral Link
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex gap-2">
              <Input value={referralLink} readOnly />
              <Button onClick={handleCopy} variant="outline" size="icon">
                {copied ? (
                  <CheckCircle className="text-green-600" size={18} />
                ) : (
                  <Copy size={18} />
                )}
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Share this link and get rewards when someone signs up.
            </p>
          </CardContent>
        </Card>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-5 border-gray-200">
            <p className="text-sm text-gray-600">Clicks</p>
            <p className="text-2xl font-semibold mt-1">124</p>
          </Card>

          <Card className="p-5 border-gray-200">
            <p className="text-sm text-gray-600">Signups</p>
            <p className="text-2xl font-semibold mt-1">18</p>
          </Card>

          <Card className="p-5 border-gray-200">
            <p className="text-sm text-gray-600">Rewards Earned</p>
            <p className="text-2xl font-semibold mt-1">$36</p>
          </Card>
        </div>

        {/* PROGRESS TOWARD NEXT REWARD */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Next Reward</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-gray-600 mb-2">
              Invite <strong>2 more friends</strong> to unlock:  
              <span className="font-medium"> $10 Bonus Credit</span>
            </p>

            <Progress value={60} className="h-2" />
          </CardContent>
        </Card>

        {/* REFERRAL HISTORY TABLE */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Referral History
            </CardTitle>
          </CardHeader>

          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-gray-600">User</th>
                  <th className="text-left py-2 text-gray-600">Status</th>
                  <th className="text-left py-2 text-gray-600">Reward</th>
                </tr>
              </thead>

              <tbody className="text-gray-800">
                <tr className="border-b">
                  <td className="py-2">akash.design</td>
                  <td className="py-2 text-yellow-600">Pending</td>
                  <td className="py-2">—</td>
                </tr>

                <tr className="border-b">
                  <td className="py-2">rahul.dev</td>
                  <td className="py-2 text-green-600">Completed</td>
                  <td className="py-2">$2</td>
                </tr>

                <tr>
                  <td className="py-2">simran.ui</td>
                  <td className="py-2 text-green-600">Completed</td>
                  <td className="py-2">$2</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
