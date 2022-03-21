using Infrastructure.DAL;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var sb = new SqlConnectionStringBuilder()
{
    DataSource = @"DESKTOP-K70ACOB\SQLEXPRESS",
    IntegratedSecurity = true,
    InitialCatalog = "ISRPO_LAB_3"
};
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationContext>(
        options => options.UseSqlServer(sb.ConnectionString));
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();


app.Run();
