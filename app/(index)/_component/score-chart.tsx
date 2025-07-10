"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function RiskScorePie({
  score,
  riskLevel,
}: {
  score: number;
  riskLevel: string;
}) {
  const data = [
    { name: "Risk", value: score },
    { name: "Remain", value: 100 - score },
  ];
  const COLORS = ["#ef4444", "#e5e7eb"];

  return (
    <Card className="glassmorphism w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2 leading-none font-semibold">
            <Shield />
            <p>Security Score</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col items-center justify-center">
          <div className="relative flex h-[120px] w-[120px] items-center justify-center">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={40}
                  outerRadius={55}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((_entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{score}</span>
            </div>
          </div>
          <span>{riskLevel}</span>
        </div>
      </CardContent>
    </Card>
  );
}
