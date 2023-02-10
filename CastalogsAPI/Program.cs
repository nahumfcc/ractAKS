using Microsoft.EntityFrameworkCore;
using CatalogsAPI.Models;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                    policy =>
                    {
                        policy.WithOrigins("https://localhost:3000", 
                                            "https://localhost:3000/",
                                            "http://localhost:8000",
                                            "http://localhost:8000/",
                                            "https://localhost",
                                            "http://localhost")
                        .WithMethods("PUT", "DELETE", "GET", "POST")
                        .WithHeaders("Content-Type", "Access-Control-Allow-Headers");
                    });
});

builder.Services.AddControllers();
builder.Services.AddDbContext<CatalogContext>(opt => opt.UseInMemoryDatabase("Products"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.MapControllers();

//app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.Run();