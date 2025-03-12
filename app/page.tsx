/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { text } from "stream/consumers";
import { Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
 } from "@/components/ui/select";

interface Task {
  id:number;
  text:string;
  isEditing:boolean;
  priority:"high" | "medium" |"low";
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // รายการสิ่งที่ต้องทำ
  const [taskText, setTaskText] = useState<string>(""); // Task ที่กำลังแก้ไข
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium") // ✅ ค่าลำดับความสำคัญเริ่มต้น

  // ✅ เพิ่ม Task ใหม่
  const handleAddTask = () => {
    if (taskText.trim() === "") return;
    setTasks([...tasks, {id: Date.now(),text: taskText,isEditing: false,priority}]);
    setTaskText(""); // ล้างค่า input
    setPriority("medium")
  };

  // ✅ อัปเดต Task ที่แก้ไข
  const handleUpdateTask = (id:number ,newText:string) => {
    setTasks(tasks.map((task) => (task.id === id ? {...task,text: newText}: task)))
  }
    

 const handleDeleteTask = (id: number) => {
  setTasks(tasks.filter((task) => task.id !== id))
 }

 const handleEditTask = (id:number) => {
  setTasks(tasks.map((task) => (task.id === id ?{...task, isEditing: true}: task)))
 }

 const handleSaveTask = (id:number) => {
  setTasks(tasks.map((task) => (task.id === id ?{...task, isEditing: false}: task)))
 }

 const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
  if(e.key === "Enter"){
    handleAddTask()
  }
 }

 const getPriorityColor = (priority: "high" |"medium" |"low") => {
    switch (priority) {
      case "high":
        return "border-red-500 text-red-700";
      case "medium":
        return "border-yellow-500 text-yellow-700"; 
      case "low":
        return "border-green-500 text-green-700";
      default:
        return "";  
    }
 }

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      {/* ฟอร์มเพิ่ม/แก้ไข Task */}
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>เพิ่มหรือแก้ไขงานของคุณ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="เพิ่มงานของคุณ..."
              value={taskText} // ✅ แสดงค่า input ที่ถูกต้อง
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={handleKeyDown} // ✅ รองรับ Enter
            />
            <Select value={priority} onValueChange={(value) => setPriority(value as "high" | "medium" | "low")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกลำดับความสำคัญ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">🔥 สำคัญมาก</SelectItem>
                <SelectItem value="medium">⚡ ปานกลาง</SelectItem>
                <SelectItem value="low">✅ น้อย</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddTask}>
              เพิ่ม
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* รายการ Task */}
      <div className="w-full max-w-md space-y-4">
        {tasks.map((task,index) => (
          <Card key={task.id} className="shadow-md">
            <CardHeader>
              <CardTitle>งานที่ {index + 1}</CardTitle> {}
            </CardHeader>
            <CardContent>
            {task.isEditing ? (
                <Input
                  type="text"
                  value={task.text}
                  onChange={(e) => handleUpdateTask(task.id, e.target.value)}
                  onKeyDown={handleKeyDown} // ✅ กด Enter เพื่อบันทึก
                />
              ) : (
                <p className="text-lg">{task.text}</p>
              )}
              <p className={`text-sm ${getPriorityColor(task.priority)}`}>
                {task.priority === "high" ? "🔥 สำคัญมาก" : task.priority === "medium" ? "⚡ ปานกลาง" : "✅ น้อย"}
              </p>
              <div className="flex gap-2 mt-2">
                {task.isEditing ? (
                  <Button variant="outline" onClick={() => handleSaveTask(task.id)}>บันทึก</Button>
                ) :(
                  <Button variant="outline" onClick={() => handleEditTask(task.id)}>แก้ไข</Button>
                )
                }
                <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>ลบ</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;


