var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// 1. Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          // Allows requests from any origin (e.g., your React frontend running on a different port)
                          policy.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// 2. Add support for Controllers (since we are not using Minimal APIs for the assignment)
builder.Services.AddControllers();

// Add Swagger/OpenAPI support (Optional, but good for testing the API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 3. Apply the CORS policy
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();
// 4. Map the controllers (This is essential for your TasksController to work)
app.MapControllers();

app.Run();

// 5. The sample 'WeatherForecast' record is removed as well.