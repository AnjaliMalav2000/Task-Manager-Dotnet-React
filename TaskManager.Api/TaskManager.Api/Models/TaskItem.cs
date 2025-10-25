// Models/TaskItem.cs
using System;

namespace TaskManager.Api.Models
{
    public class TaskItem
    {
        public Guid Id { get; set; } = Guid.NewGuid(); // Initialize Id to a new GUID by default
        public string Description { get; set; } // Note: C# convention is TitleCase for properties
        public bool IsCompleted { get; set; } = false;
    }
}