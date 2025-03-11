"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TodoApp = () => {
  const [Tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...Tasks, task]);
      setTask("");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 ">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>เพิ่มรายการที่ต้องทำของคุณ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="เพิ่มงานของคุณ..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button onClick={addTask}>เพิ่ม</Button>
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-md space-y-4">
        {Tasks.map((t, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle>งานที่{index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{t}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default TodoApp;
