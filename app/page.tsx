/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState,useEffect } from "react";
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
  timestamp: number;
  completedTime?: number;
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // รายการสิ่งที่ต้องทำ
  const [taskText, setTaskText] = useState<string>(""); // Task ที่กำลังแก้ไข
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium") // ✅ ค่าลำดับความสำคัญเริ่มต้น
  const [taskTime, setTasktime] = useState<string>("");

  // ✅ เพิ่ม Task ใหม่
  const handleAddTask = () => {
    if (taskText.trim() === "" || taskTime.trim() === "") return;
    

   

    setTasks([...tasks, {id: Date.now(),text: taskText,isEditing: false,priority:priority, timestamp: new Date(taskTime).getTime() || Date.now(),completedTime: undefined}]);
    setTaskText(""); // ล้างค่า input
    setPriority("medium");
    setTasktime("");
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddTask();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, );

  // ✅ อัปเดต Task ที่แก้ไข
  function handleUpdateTask(id: number, newText: string) {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  }

  const handleCompleteTask = (id: number) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, completedTime: task.completedTime ? undefined : Date.now()} :task))
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
    e.preventDefault();
     handleAddTask();
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
      <Card className="w-full  shadow-lg">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>เพิ่มหรือแก้ไขงานของคุณ</CardDescription>
        </CardHeader>
        <CardContent>
        <div>
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
            <Input 
              type="datetime-local"
              value={taskTime}
              onChange={(e) => setTasktime(e.target.value)}
              className="border p-2"
            />
            <Button onClick={handleAddTask}>
              เพิ่ม
            </Button>
          </div>
        </div>
        </CardContent>
      </Card>

      <div className="w-full  space-y-6">
      {["high", "medium", "low"].map((level) => {
        const filteredTasks = tasks.filter((task) => task.priority === level);
         return filteredTasks.length > 0 && (
          <div key={level}>
            <h2 className={`text-xl font-bold px-4 py-2 text-white ${
              level === "high" ? "bg-red-500":
              level === "medium" ? "bg-yellow-500":
              "bg-green-500"
            }` }>
              {level === "high" ? "🔥 สำคัญมาก" : level === "medium" ? "⚡ ปานกลาง" : "✅ น้อย"}
            </h2>


            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">งาน</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">เวลา</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">จัดการ</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">เสร็จสิ้น</th>
                </tr>
              </thead>
              <tbody>
              {filteredTasks.map((task, index) => (
                <tr key ={task.id} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2 text-center">{index +1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold">
                      {new Date(task.timestamp).toLocaleDateString("th-TH", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                     })}
                      </span>
                      <span className="text-sm text-gray-600">
                      เวลา {new Date(task.timestamp).toLocaleTimeString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })} น.
                      </span>
                  </div>
                </td>
                    
                  <td className="border border-gray-300 px-4 py-2">
                    {task.isEditing ? (
                      <Input
                        type="text"
                        value={task.text}
                        onChange={(e) => handleUpdateTask(task.id, e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    ) : (
                      <p className="text-lg">{task.text}</p>
                    )}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 text-center">
                        <input 
                          type="checkbox" 
                          checked={!!task.completedTime} 
                          onChange={() => handleCompleteTask(task.id)} 
                        />
                        {task.completedTime && (
                          <span className="ml-2 text-green-600">
                            {new Date(task.completedTime).toLocaleString("th-TH", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
    })}
                          </span>
                        )}
                      </td>

                   

                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      {task.isEditing ? (
                        <Button variant="outline" onClick={() => handleSaveTask(task.id)}>บันทึก</Button>
                      ) : (
                        <Button variant="outline" onClick={() => handleEditTask(task.id)}>แก้ไข</Button>
                      )}
                      <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>ลบ</Button>
                    </div>
                  </td>
                  
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  </div>
);
}

export default TodoApp;


