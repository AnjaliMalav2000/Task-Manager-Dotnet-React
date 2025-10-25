// Controllers/TasksController.cs
using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Models;

namespace TaskManager.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // This defines the base route as 'api/tasks'
    public class TasksController : ControllerBase
    {
        // 💡 In-memory storage list
        private static readonly List<TaskItem> _tasks = new List<TaskItem>
        {
            new TaskItem { Description = "Initial setup", IsCompleted = true },
            new TaskItem { Description = "Build backend API", IsCompleted = false }
        };

        // GET /api/tasks (Display a list of tasks)
        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks()
        {
            return Ok(_tasks);
        }

        // POST /api/tasks (Add a new task)
        [HttpPost]
        public ActionResult<TaskItem> AddTask(TaskItem task)
        {
            task.Id = Guid.NewGuid(); // Ensure a fresh GUID
            task.IsCompleted = false; // New tasks are not completed
            _tasks.Add(task);
            // Returns 201 Created status and the new task object
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        // PUT /api/tasks/{id} (Mark as completed/uncompleted)
        [HttpPut("{id}")]
        public IActionResult UpdateTask(Guid id, TaskItem updatedTask)
        {
            var existingTask = _tasks.FirstOrDefault(t => t.Id == id);

            if (existingTask == null)
            {
                return NotFound();
            }

            // Only update properties allowed by the functional requirements
            existingTask.Description = updatedTask.Description; // Update description
            existingTask.IsCompleted = updatedTask.IsCompleted; // Toggle completion status

            return NoContent(); // 204 No Content for successful update
        }

        // DELETE /api/tasks/{id} (Delete a task)
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(Guid id)
        {
            var taskToRemove = _tasks.FirstOrDefault(t => t.Id == id);

            if (taskToRemove == null)
            {
                return NotFound();
            }

            _tasks.Remove(taskToRemove);
            return NoContent(); // 204 No Content for successful deletion
        }
    }
}